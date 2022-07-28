/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   backend_pong.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/26 10:15:03 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/27 18:48:48 by mbonnet          ###   ########.fr       */
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

exports.drawScorAndDeco = async function(socket, data){
	var tmp = await takeGame(data.game.game_id);
	var game = tmp.rows[0]
	socket.emit('drawScorAndDeco', {game:game})
}

exports.checkPlay = async function(socket, data)
{
	var checkRaquette1 = await takeRaquette(data.game.raquette1_id);
	var checkRaquette2 = await takeRaquette(data.game.raquette2_id);
	var tmp2 = {ball:await takeBall(data.game.ball_id), game:data.game}
	if (checkRaquette1.rows[0].connect == true && checkRaquette2.rows[0].connect == true)
	{
		socket.emit('sendBall', tmp2);
		return ;
	}
	else 
		socket.emit('checkPlay')
}

