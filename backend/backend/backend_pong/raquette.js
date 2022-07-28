/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   raquette.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/27 18:40:51 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/28 18:35:05 by mbonnet          ###   ########.fr       */
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

exports.sendRaquette = async function(socket, game)
{
	var raq1 = await takeRaquette(game.raquette1_id);
	var raq2 = await takeRaquette(game.raquette2_id);
	var game = await takeGame(game.game_id)
	socket.send(JSON.stringify({type:'sendRaquette', raq1:raq1.rows[0], raq2:raq2.rows[0], game:game.rows[0]}))
}

exports.mouvRaquette = async function(socket, data)
{
	var game = await takeGame(data.game.game_id);
	var raquette = await takeRaquette(data.raquette);
	var raquette2;
	if (data.raquette%2 == 0)
		raquette2 = await takeRaquette(data.raquette - 1);
	else 
		raquette2 = await takeRaquette(data.raquette + 1);
	if ((raquette.rows[0].p_y > 0 || data.sence > 0) 
	&& (raquette.rows[0].p_y + raquette.rows[0].t_y < game.rows[0].canvasy || data.sence < 0))
	{
		await mouvRaquettePy(raquette.rows[0].p_y + data.sence, raquette.rows[0].raquette_id)
		raquette = await takeRaquette(data.raquette);
	}		
}