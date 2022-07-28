/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   mouv.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/26 10:44:49 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/27 18:35:37 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var client1 = require('./../index');

//fonction de modification des valeur de raquette 
exports.mouvRaquettePx = async function(px, raquette_id)
{
	await client1.client1.query(`UPDATE raquettes SET p_x=` + px + ` 
								WHERE raquette_id=` + raquette_id + `;`);
}

exports.mouvRaquettePy = async function(py, raquette_id)
{
	await client1.client1.query(`UPDATE raquettes SET p_y=` + py + ` 
								WHERE raquette_id=` + raquette_id + `;`);
}

exports.mouvRaquetteTy = async function(ty, raquette_id)
{
	await client1.client1.query(`UPDATE raquettes SET t_y=` + ty + ` 
								WHERE raquette_id=` + raquette_id + `;`);
}

exports.mouvRaquetteConnect = async function(connect, raquette_id)
{
	await client1.client1.query(`UPDATE raquettes SET connect=` + connect + ` 
								WHERE raquette_id=` + raquette_id + `;`);
}

//fonction de modification des valeur de ball

exports.mouvBallPx = async function(px, ball_id)
{
	await client1.client1.query(`UPDATE balls SET p_x=` + px + ` 
								WHERE ball_id=` + ball_id + `;`);
}

exports.mouvBallPy = async function(py, ball_id)
{
	await client1.client1.query(`UPDATE balls SET p_y=` + py + ` 
								WHERE ball_id=` + ball_id + `;`);
}

exports.mouvBallMx = async function(mx, ball_id)
{
	await client1.client1.query(`UPDATE balls SET m_x=` + mx + ` 
								WHERE ball_id=` + ball_id + `;`);
}

exports.mouvBallMy = async function(my, ball_id)
{
	await client1.client1.query(`UPDATE balls SET m_y=` + my + ` 
								WHERE ball_id=` + ball_id + `;`);
}

//function mouv de game

exports.mouvGameRaquette1 = async function(raquette1_id, game_id)
{
	await client1.client1.query(`UPDATE games SET raquette1_id=` + raquette1_id + ` 
								WHERE game_id=` + game_id + `;`);
}

exports.mouvGameRaquette2 = async function(raquette2_id, game_id)
{
	await client1.client1.query(`UPDATE games SET raquette2_id=` + raquette2_id + ` 
								WHERE game_id=` + game_id + `;`);
}

exports.mouvGameBall = async function(ball_id, game_id)
{
	await client1.client1.query(`UPDATE games SET ball_id=` + ball_id + ` 
								WHERE game_id=` + game_id + `;`);
}

exports.mouvGameCanvasX = async function(canvasx, game_id)
{
	await client1.client1.query(`UPDATE games SET canvasx=` + canvasx + ` 
								WHERE game_id=` + game_id + `;`);
}
exports.mouvGameCanvasY = async function(canvasy, game_id)
{
	await client1.client1.query(`UPDATE games SET canvasy=` + canvasy + ` 
								WHERE game_id=` + game_id + `;`);
}

exports.mouvGameBlocksize = async function(blocksize, game_id)
{
	await client1.client1.query(`UPDATE games SET blocksize=` + blocksize + ` 
								WHERE game_id=` + game_id + `;`);
}

exports.mouvGameDificult = async function(dificult, game_id)
{
	await client1.client1.query(`UPDATE games SET dificult=` + dificult + ` 
								WHERE game_id=` + game_id + `;`);
}

exports.mouvGamePointPlayer1 = async function(pointPlayer1, game_id)
{
	await client1.client1.query(`UPDATE games SET pointplayer1=` + pointPlayer1 + ` 
								WHERE game_id=` + game_id + `;`);
}

exports.mouvGamePointPlayer2 = async function(pointPlayer2, game_id)
{
	await client1.client1.query(`UPDATE games SET pointplayer2=` + pointPlayer2 + ` 
								WHERE game_id=` + game_id + `;`);
}

exports.mouvGameFin = async function(fin, game_id)
{
	await client1.client1.query(`UPDATE games SET fin=` + fin + ` 
								WHERE game_id=` + game_id + `;`);
}




