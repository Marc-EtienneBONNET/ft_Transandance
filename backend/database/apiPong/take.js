/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   take.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/26 10:11:08 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/26 16:50:09 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { query } = require('express');
var client1 = require('./../index');

exports.takeRaquette = function(raquette_id)
{
	return (client1.client1.query(`SELECT * FROM raquettes WHERE raquette_id=` + raquette_id + `;`));
}

exports.takeBall = function(ball_id)
{
	return (client1.client1.query(`SELECT * FROM balls WHERE ball_id=` + ball_id + `;`));
}


exports.takeGame = function(game_id)
{
	return (client1.client1.query(`SELECT * FROM games WHERE game_id=` + game_id + `;`));
}


exports.takeAllRaquette = function()
{
	return (client1.client1.query(`SELECT * FROM raquettes`));
}

exports.takeAllBall = function()
{
	return (client1.client1.query(`SELECT * FROM balls`));
}


exports.takeAllGame = function()
{
	return (client1.client1.query(`SELECT * FROM games`));
}



exports.takeAllRaquetteDes = function()
{
	return (client1.client1.query(`SELECT * FROM raquettes ORDER BY raquette_id DESC`));
}

exports.takeAllBallDes = function()
{
	return (client1.client1.query(`SELECT * FROM balls ORDER BY ball_id DESC`));
}


exports.takeAllGameDes = async function()
{
	return (client1.client1.query(`SELECT * FROM games ORDER BY game_id DESC`));
}