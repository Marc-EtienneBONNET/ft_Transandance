/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   backend_pong_end.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/27 18:40:51 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/27 18:41:41 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var {
	DeleteAllTableByName, 
	DeleteOneRaquette,
	DeleteOneBall,
	DeleteOneGame
} = require('./../../database/apiPong/delete');
var {
	CreateTableGames, 
	CreateTableRaquettes,
	CreateTableBalls
} = require('./../../database/apiPong/create');
var {
	insertRaquette,
	insertBall,
	insertGame
} = require('./../../database/apiPong/insert');
var {
	takeRaquette, takeBall, takeGame,
	takeAllRaquette, takeAllBall, takeAllGame,
	takeAllRaquetteDes, takeAllBallDes, takeAllGameDes
} = require('./../../database/apiPong/take');
var {
	mouvRaquettePx, mouvRaquettePy, mouvRaquetteTy, mouvRaquetteConnect,
	mouvBallPx, mouvBallPy, mouvBallMx, mouvBallMy,
	mouvGameRaquette1,mouvGameRaquette2,mouvGameBall,mouvGameCanvasX,mouvGameCanvasY,mouvGameBlocksize,mouvGameDificult,mouvGamePointPlayer1,mouvGamePointPlayer2, mouvGameFin
} = require('./../../database/apiPong/mouv');

exports.end = async function(socket, data)
{
	var tmp = await takeGame(data.game.game_id);
	var game_id = tmp.rows[0].game_id;
	var raquette1_id = tmp.rows[0].raquette1_id;
	var raquette2_id = tmp.rows[0].raquette2_id;
	var ball_id = tmp.rows[0].ball_id;
	DeleteOneGame(game_id);
	DeleteOneRaquette(raquette2_id);
	DeleteOneRaquette(raquette1_id);
	DeleteOneBall(ball_id);
}

exports.prematurEnd = async function(socket, data){
	await mouvGameFin(true,data.game.game_id);
}