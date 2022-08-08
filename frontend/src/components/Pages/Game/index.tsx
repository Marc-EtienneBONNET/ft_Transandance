/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/08 15:50:20 by mbonnet           #+#    #+#             */
/*   Updated: 2022/08/08 20:23:48 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { HeroContainer, HeroContent } from "../PlayGame";

export const Pong = () => {
	
	const [socket, setSocket] = useState<any>(null);
	useEffect(() => {
		setSocket(io('http://localhost:3000/api'));
	  }, []);

	class Games {
		id = -1;
		ball_id = -1;
		canvasX = -1;
		canvasY = -1;
		blocksize = -1;
		player1 = -1;
		player2 = -1;
		dificult = -1;
		point1 = 0;
		point2 = 0;
		winner = -1;
	}

	class Raq {
		id = -1;
		user_id = -1;
		p_x = -1;
		p_y = -1;
		t_y = -1;
		connect = false;
	}

	class Ball {
		id = -1;
		p_x = -1;
		p_y = -1;
		m_x = 1;
		m_y = 1;
	}

	class User {
		constructor(id, name){
			this.id = id;
			this.name = name		
		}
		id = -1;
		name = "";
	}

	class Historique {
		constructor(){
			this.winner_id = myGame.winner;
			if (this.winner_id != myRaq1.user_id)
			{
				this.coter_winner = 2;
				this.looser_id = myRaq1.user_id;
				this.winner_point = myGame.point2;
				this.looser_point = myGame.point1;
			}
			else
			{
				this.coter_winner = 1;
				this.looser_id = myRaq2.user_id;
				this.winner_point = myGame.point1;
				this.looser_point = myGame.point2;
			}
			this.dificult = myGame.dificult;
		}
		coter_winner = -1;
		winner_id = -1;
		looser_id = -1;
		winner_point = -1;
		looser_point = -1;
		dificult = 1;  
	}


	let myGame = new Games();
	let myRaq1 = new Raq();
	let myRaq2 = new Raq();
	let myBall = new Ball();
	let myUser;
	let canvas;
	let ctx;

	function createUser(id, name)
	{
		myUser = new User(id, name);
	}

	function init(canvasX)
	{
		var parent;
		parent = document.getElementsByTagName('body')[0];
		canvas = document.createElement('canvas');
		canvas.width =  canvasX;
		canvas.height =	canvasX*0.6;
		canvas.style.border = "1px solid";
		ctx = canvas.getContext('2d');
		parent.appendChild(canvas);
	}

	function beforeStartGame()
	{
		stade();
		ctx.fillStyle = "#000000";
		ctx.font = "10pt Calibri,Geneva,Arial";
		ctx.fillText("attendez quelque minute pour\nque l on vous trouve voitre date !", myGame.canvasX/2 - 200 ,  myGame.canvasY/2);
	}

	function end(socket, data)
	{
		let str;
		ctx.fillStyle = "#000000";
		if (myUser.id === data.winner_id)
			str = "Winner !"
		else
			str = "looser"
		ctx.font = "15pt Calibri,Geneva,Arial";
		ctx.fillText(str, myGame.canvasX/2 - 35 ,  myGame.canvasY/2 - 30);
		ctx.font = "20pt Calibri,Geneva,Arial";
		if (data.coter_winner === 1)
			ctx.fillText(data.winner_point + " | " + data.looser_point , myGame.canvasX/2 - 30 ,  myGame.canvasY/2 + 30);
		else
			ctx.fillText(data.looser_point + " | " + data.winner_point , myGame.canvasX/2 - 30,  myGame.canvasY/2 + 30);
		socket.disconnect()
	}
	
	function UpadateGame(id, ball_id, canvasX, canvasY
		, blocksize, dificult, player1, player2, winner, point1, point2)
	{
		myGame.id = id;
		myGame.ball_id = ball_id;
		myGame.canvasX = canvasX;
		myGame.canvasY = canvasY;
		myGame.blocksize = blocksize;
		myGame.player1 = player1;
		myGame.player2 = player2;
		myGame.dificult = dificult;
		myGame.point1 = point1;
		myGame.point2 = point2;
		myGame.winner = winner;
	}

	function UpadateRaq1(id,user_id,p_x, p_y, t_y, connect)
	{
		myRaq1.id = id;
		myRaq1.user_id = user_id;
		myRaq1.p_x = p_x;
		myRaq1.p_y = p_y;
		myRaq1.t_y = t_y;
		myRaq1.connect = connect;
	}

	function UpadateRaq2(id,user_id,p_x, p_y, t_y, connect)
	{
		myRaq2.id = id;
		myRaq2.user_id = user_id;
		myRaq2.p_x = p_x;
		myRaq2.p_y = p_y;
		myRaq2.t_y = t_y;
		myRaq2.connect = connect;
	}

	function UpadateBall(id, p_x, p_y)
	{
		myBall.id = id;
		myBall.p_x = p_x;
		myBall.p_y = p_y;
	}

	function update(data)
	{
		if (data.myGame)
		{
			UpadateGame(data.myGame.id, data.myGame.ball_id, data.myGame.canvasX, data.myGame.canvasY
				, data.myGame.blocksize, data.myGame.dificult, data.myGame.player1, data.myGame.player2
				, data.myGame.winner, data.myGame.point1, data.myGame.point2);
		}
		if (data.myRaq1)	
			UpadateRaq1(data.myRaq1.id, data.myRaq1.user_id, data.myRaq1.p_x, data.myRaq1.p_y, data.myRaq1.t_y, data.myRaq1.connect);
		if (data.myRaq2 )
			UpadateRaq2(data.myRaq2.id, data.myRaq2.user_id, data.myRaq2.p_x, data.myRaq2.p_y, data.myRaq2.t_y, data.myRaq2.connect);
		if (data.myBall)
		{
			UpadateBall(data.myBall.id, data.myBall.p_x, data.myBall.p_y);
		}	
		
	}


	function clean(){
		ctx.clearRect(0,0, myGame.canvasX, myGame.canvasY);
	}

	function draws()
	{
		stade();
		ball();
		raquette();
	}

	function mouvs(socket)
	{
		mouvBall(socket);
	}

	function checkEnd(socket)
	{	
		if (myGame.point1 === 5)
			socket.emit('mouvWinner', {winner:1});
		else if (myGame.point2 === 5)
			socket.emit('mouvWinner', {winner:2});
	}

	function MesEnd(socket)
	{
		var res = new Historique();	
		socket.emit('end', res);
		end(socket, res);
		
	}

	function calY()
	{
		var tmp2 = myBall.m_y; 
		var tmp = myBall.m_x; 
		if ( tmp < 0)
			tmp *= -1;
		myBall.m_y = Math.round(tmp * Math.tan(30 * Math.PI / 100));
		if (tmp2 < 0 && myBall.m_y > 0)
			myBall.m_y *= -1;
		myBall.m_x *= -1;
	}
	function calX()
	{
		
		var tmp2 = myBall.m_x;
		var tmp = myBall.m_y;
		if ( tmp < 0)
			tmp *= -1;
		myBall.m_x = -1 * Math.round(tmp/Math.tan(30 * Math.PI / 100));
		if (tmp2 > 0 && myBall.m_x < 0)
			myBall.m_x *= -1;
		myBall.m_y *= -1;
	}

	function checkColision()
	{
		if ((myBall.p_y > myRaq1.p_y && myBall.p_y < myRaq1.p_y + myRaq1.t_y))
			if ((myBall.p_x > myRaq1.p_x && myBall.p_x < myRaq1.p_x + myGame.blocksize))
			{
				if ((myBall.m_x < 0 && myBall.p_x > myRaq1.p_x + myGame.blocksize/2) ||
					(myBall.m_x > 0 && myBall.p_x < myRaq1.p_x + myGame.blocksize/2))
					calY();
				return (1);	
			}
		if ((myBall.p_y > myRaq2.p_y && myBall.p_y < myRaq2.p_y + myRaq2.t_y))
			if ((myBall.p_x > myRaq2.p_x && myBall.p_x < myRaq2.p_x + myGame.blocksize))
			{
				if ((myBall.m_x > 0 && myBall.p_x < myRaq2.p_x + myGame.blocksize/2) ||
					(myBall.m_x < 0 && myBall.p_x > myRaq2.p_x + myGame.blocksize/2))
					calY();
				return (1);
			}
			return (0);
	}

	function mouvBall(socket)
	{
		if (myBall.id === -1)
			return ;
		if (checkColision() === 0)
		{
			if (myRaq1.user_id !== myUser.id)
				return ;
			if (((myBall.p_x <= 0 && myBall.m_x < 0) || (myBall.p_x >= myGame.canvasX && myBall.m_x > 0)))
			{
				if (myBall.p_x <= 0 && myBall.m_x < 0)
				socket.emit('mouvPoint', {point1:myGame.point1, point2:myGame.point2 + 1});
				else if (myBall.p_x >= myGame.canvasX && myBall.m_x > 0)
				socket.emit('mouvPoint', {point1:myGame.point1 + 1, point2:myGame.point2});
				calY();
			}
			if (((myBall.p_y <= 0 && myBall.m_y < 0) || (myBall.p_y >= myGame.canvasY && myBall.m_y > 0)))
				calX();
		}	
		socket.emit('mouvBall', { newX:myBall.m_x + myBall.p_x, newY:myBall.m_y + myBall.p_y});
	}

	function mouvRaq(socket, nb)
	{
		if (myUser.id == myRaq1.user_id && ((nb > 0 && myRaq1.p_y + myRaq1.t_y <= myGame.canvasY) || (nb < 0 && myRaq1.p_y >= 0)))
			socket.emit('mouvRaq', {witchRaq:1, p_y:nb});
		else if (myUser.id == myRaq2.user_id && ((nb > 0 && myRaq2.p_y <= myGame.canvasY) || (nb < 0 && myRaq2.p_y >= 0)))
			socket.emit('mouvRaq', {witchRaq:2, p_y:nb});
	}

	function stade()
	{	
		ctx.fillRect(myGame.canvasX/2, 0,  1, myGame.canvasY);	
	}

	function ball()
	{	
		ctx.beginPath();
		ctx.arc(myBall.p_x, myBall.p_y, myGame.blocksize/2, 0, Math.PI*2, true);
		ctx.fill();
	}


	function raquette()
	{	
		ctx.fillRect(myRaq1.p_x, myRaq1.p_y,  myGame.blocksize, myRaq1.t_y);
		ctx.fillRect(myRaq2.p_x, myRaq2.p_y,  myGame.blocksize, myRaq2.t_y);	
	}
	
	console.log(socket);
	createUser(1,"Marco");
	init(500);
	// socket.emit('Lancer de comunication', {user:myUser, canvasX:canvas.width});
	// socket.on('update', (data)=> {
	// 	update(data);
	// 	if (myGame.ball_id === -1)
	// 		beforeStartGame();
	// 	else 
	// 	{
	// 		start();
	// 		return ;
	// 	}
	// 	setTimeout(forEmitUpdateWithTimeout, 3000);
	// });

	// function forEmitUpdateWithTimeout(){
	// 	socket.emit('update', myGame)
	// }
	// function start()
	// {
	// 	socket.emit('run', myGame)
	// 	socket.on('run', (data)=> {
	// 		clean();
	// 		draws();
	// 		mouvs(socket);
	// 		checkEnd(socket);
	// 		update(data);
	// 		if (myGame.winner === -1)
	// 			setTimeout(forEmitRunWithTimeout, 3);
	// 		else
	// 			MesEnd(socket);
	// 	})
	// }

	// function forEmitRunWithTimeout(){
	// 	socket.emit('run', myGame)
	// }

	// document.onkeydown = function mouvRaquette(e)
	// {
	// 	if (e.keyCode == 39)//bas
	// 		mouvRaq(socket, -5);
	// 	else if (e.keyCode == 37)//haut
	// 		mouvRaq(socket, +5);
	// }
	return (
		<HeroContainer>
			<HeroContent id="pong"></HeroContent>
			{/* <button onClick={() => { 
			socket.emit('Lancer de comunication', {user:myUser, canvasX:canvas.width})}}>+</button> */}
		</HeroContainer>
	);
}