/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   init.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/27 18:40:51 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/28 19:14:37 by mbonnet          ###   ########.fr       */
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

async function createTab()
{
	try{
		await CreateTableBalls();
		await CreateTableRaquettes();
		await CreateTableGames();
		await initNewMembre();
		await insertInitValue();
		console.log("the database is create")
	}
	catch(e){console.log("the database is already create")}
}

async function initNewMembre()
{
	try{
		await insertGame();
		await insertBall();
		await insertRaquette();
		await insertRaquette();
	   console.log("the game, raquette1 raquette2, player1 and player2 and the ball is init")
   }
   catch(e){console.log("erreur l or de l init des ellement du game " + e)}
}
var game;

async function insertInitValue()
{
	try{
		var tmp;
		var canvasX = 500;
		tmp = await takeAllRaquetteDes();
		var raquette1 = tmp.rows[1];
		var raquette2 = tmp.rows[0];
		tmp = await takeAllBallDes();
		var ball = tmp.rows[0];
		tmp = await takeAllGameDes();
		var game = tmp.rows[0];
		//init des valeur du game;
		await mouvGameRaquette1(raquette1.raquette_id, game.game_id);
		await mouvGameRaquette2(raquette2.raquette_id, game.game_id);
		await mouvGameBall(ball.ball_id, game.game_id);
		await mouvGameCanvasX(canvasX, game.game_id);
		await mouvGameCanvasY(canvasX*0.6, game.game_id);
		await mouvGameBlocksize(canvasX/50, game.game_id);
		await mouvGameDificult(1, game.game_id);
		await mouvGamePointPlayer1(0, game.game_id);
		await mouvGamePointPlayer2(0, game.game_id);
		await mouvGameFin(false, game.game_id);
		tmp = await takeAllGameDes();
		var game = tmp.rows[0];
		await mouvRaquettePx(game.blocksize, raquette1.raquette_id);
		await mouvRaquettePy(game.canvasy/2 - (game.blocksize * 0.2), raquette1.raquette_id);
		await mouvRaquetteTy(game.blocksize * (5 - game.dificult), raquette1.raquette_id);
		await mouvRaquettePx(game.canvasx - (game.blocksize * 2), raquette2.raquette_id);
		await mouvRaquettePy(game.canvasy/2 - (game.blocksize * 0.2), raquette2.raquette_id);
		await mouvRaquetteTy(game.blocksize * (5 - game.dificult), raquette2.raquette_id);
		await mouvBallPx(game.canvasx/2, ball.ball_id);
		await mouvBallPy(game.canvasy/2, ball.ball_id);
		await mouvBallMx(1, ball.ball_id);
		await mouvBallMy(1, ball.ball_id);		
	}
	catch(e){console.log("erreur l or de la rentrer des valeur d init " + e)}
}

async function chooseGame()
{
	var tmp = await takeAllGame();
	var game;
	var raqId = 0;
	for (var x = 0; tmp && tmp.rows[x]; x++)
	{
		var raquette1 = await takeRaquette(tmp.rows[x].raquette1_id);
		var raquette2 = await takeRaquette(tmp.rows[x].raquette2_id);
		if (raquette1.rows[0].connect == null) 
		{
			raqId = raquette1.rows[0].raquette_id;
			game = tmp.rows[x];
			await mouvRaquetteConnect(true,raquette1.rows[0].raquette_id);
			break ;
		}
		else if (raquette2.rows[0].connect == null)
		{
			raqId = raquette2.rows[0].raquette_id;
			game = tmp.rows[x];
			await mouvRaquetteConnect(true,raquette2.rows[0].raquette_id);
			break ;
		}
		else
			raqId = 0;
		
	}
	if (raqId == 0)
	{
		await initNewMembre();
		await insertInitValue();
		var raq = await takeAllRaquetteDes();
		var tmp2 =  await takeAllGameDes();
		game = tmp2.rows[0];
		raqId = raq.rows[1].raquette_id;
		await mouvRaquetteConnect(true,raq.rows[1].raquette_id);
	}
	return ({game:game, raqId:raqId});	
}

exports.initGames = async function(socket)
{
	await createTab();
	var tmp = await chooseGame()
	socket.send(JSON.stringify({type:'sendGameValue', data:tmp}));
	var tmp2 = {ball:await takeBall(tmp.game.ball_id), game:tmp.game}
	socket.send(JSON.stringify({type:'checkPlay'}));
	socket.send(JSON.stringify({type:'drawScorAndDeco', game:tmp.game}))
}