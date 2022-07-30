/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.tsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/28 14:14:35 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/28 19:48:35 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { HeroContainer, HeroContent } from "../PlayGame";

export const GamePong = () => {
	var raqId = 0;
	var canvas;
	var game;
	var ctx;
	var ballx = 0;
	var bally = 0;
	
	var W3CWebSocket = require('websocket').w3cwebsocket;
	var client = new W3CWebSocket('ws://localhost:3000/', 'echo-protocol');
	client.onopen = () => {
		client.send(JSON.stringify({type:"init"}));
	};
	client.onmessage = (message) => {
		var data = JSON.parse(message.data);
		if (data.type == "sendGameValue")
			init(data.data);
		if (data.type == "sendRaquette")
			drawRaquette(data.raq1, data.raq2)
		if (data.type == "checkPlay")
			client.send(JSON.stringify({type:"callPlay", game:game}))
		if (data.type == "drawScorAndDeco")
			drawScorAndDeco(data);
		if (data.type == "sendBall")
			drawBall(data);
		
	};
	
	function init(data)
	{
		var parent;
		parent = document.getElementById('pong');
		canvas = document.createElement('canvas');
		canvas.width =  data.game.canvasx;
		canvas.height = data.game.canvasy;
		canvas.style.border = "1px solid";
		ctx = canvas.getContext('2d');
		parent.appendChild(canvas);
		raqId = data.raqId;
		game = data.game;
		client.send(JSON.stringify({type:'callRaquette', game:game}));
	}

	function drawRaquette(raquette1, raquette2)
	{
		ctx.fillStyle = "#000000";
		ctx.clearRect(raquette1.p_x, raquette1.p_y - 10, raquette1.t_y/5, raquette1.t_y + 20);
		ctx.clearRect(raquette2.p_x, raquette2.p_y - 10, raquette2.t_y/5, raquette2.t_y + 20);
		ctx.fillRect(raquette1.p_x, raquette1.p_y,  raquette1.t_y/5, raquette1.t_y);
		ctx.fillRect(raquette2.p_x, raquette2.p_y,  raquette2.t_y/5, raquette2.t_y);
	}

	function drawScorAndDeco(data)
	{
		ctx.fillStyle = "#000000";
		ctx.font = "10pt Calibri,Geneva,Arial";
		ctx.clearRect(10,9, 50, 12);
		ctx.fillRect(data.game.canvasx/2, 0,  1, data.game.canvasy);
		ctx.fillText(data.game.pointplayer1 + " | " +  data.game.pointplayer2, 10 ,  20);
	}

	function drawBall(data)
	{
		ctx.clearRect(ballx - (data.tmp2.game.rows[0].blocksize/2),bally - (data.tmp2.game.rows[0].blocksize/2), data.tmp2.game.rows[0].blocksize, data.tmp2.game.rows[0].blocksize);
		ctx.beginPath();
		ctx.arc(data.tmp2.ball.rows[0].p_x,data.tmp2.ball.rows[0].p_y, data.tmp2.game.rows[0].blocksize/2, 0, Math.PI*2, true);
		ballx = data.tmp2.ball.rows[0].p_x;
		bally = data.tmp2.ball.rows[0].p_y;
		ctx.fill();
		if (data.tmp2.game.rows[0].pointplayer1 < 5 && data.tmp2.game.rows[0].pointplayer2 < 5 && data.tmp2.game.rows[0].fin == false)
			setTimeout(call,3);
		else
		{
			end(data);
		}
	}

	function call()
	{
		console.log("coucou");
		client.send(JSON.stringify({type:'callMouvBall', game:game, raq:raqId}));
		client.send(JSON.stringify({type:'callRaquette', game:game}));
		client.send(JSON.stringify({type:'drawScorAndDeco', game:game}));
	}
	
	function end(data)
	{
		var str = " Winner "
		if (data.tmp2.game.pointplayer1 == 5 && raqId%2 == 0)
			str = "GameOver";
		ctx.fillStyle = "#000000";
		ctx.font = "30pt Calibri,Geneva,Arial";
		ctx.fillText(str, data.tmp2.game.canvasx/2 - 80 , data.tmp2.game.canvasy/2 - 30);
		ctx.font = "40pt Calibri,Geneva,Arial";
		ctx.fillText(data.tmp2.game.pointplayer1 + " | " +  data.tmp2.game.pointplayer2, data.tmp2.game.canvasx/2 - 60 , data.tmp2.game.canvasy/2 + 30);
		if (raqId == 1)
			client.send(JSON.stringify({type:'end', game:game}));
	}

	document.onkeydown = function mouvRaquette(e)
	{
		if (e.keyCode == 39)
			client.send(JSON.stringify({type:'callMouvRaq', sence:-5, raquette:raqId, game:game}));
		else if (e.keyCode == 37)
			client.send(JSON.stringify({type:'callMouvRaq', sence:+5, raquette:raqId, game:game}));
	}

	return (
		<HeroContainer>
			<HeroContent id="pong"></HeroContent>
		</HeroContainer>
	)
}


