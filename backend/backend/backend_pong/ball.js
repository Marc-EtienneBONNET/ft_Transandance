/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   backend_pong_ball.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/27 18:40:51 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/27 18:46:56 by mbonnet          ###   ########.fr       */
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

function calY(ball)
{
	var bm_y = ball.rows[0].m_y;
	var bm_x = ball.rows[0].m_x;
	var tmp2 = ball.rows[0].m_y; 
	var tmp = ball.rows[0].m_x; 
	if ( tmp < 0)
		tmp *= -1;
		bm_y = Math.round(tmp * Math.tan(30 * Math.PI / 100));
	if (tmp2 < 0 && bm_y > 0)
		bm_y *= -1;
	bm_x *= -1;
	return ({bm_y:bm_y, bm_x:bm_x});
}
function calX(ball)
{
	var bm_y = ball.rows[0].m_y;
	var bm_x = ball.rows[0].m_x;
	var tmp2 = ball.rows[0].m_x;
	var tmp = ball.rows[0].m_y;
	if ( tmp < 0)
		tmp *= -1;
	bm_x = -1 * Math.round(tmp/Math.tan(30 * Math.PI / 100));
	if (tmp2 > 0 && bm_x < 0)
		bm_x *= -1;
	bm_y *= -1;
	return ({bm_y:bm_y, bm_x:bm_x});
}

async function percut(game)
{
	var ball = await takeBall(game.rows[0].ball_id);
	var tmp = 0;
	if (ball.rows[0].p_x <= 0)
	{ 
		tmp = calY(ball);
		await mouvBallPx(game.rows[0].canvasx/2, ball.rows[0].ball_id)
		await mouvBallPy(game.rows[0].canvasy/2, ball.rows[0].ball_id)
		await mouvGamePointPlayer2(game.rows[0].pointplayer2 + 1, game.rows[0].game_id)
	}
	else if (ball.rows[0].p_x >= game.rows[0].canvasx)
	{ 
		tmp = calY(ball);
		await mouvBallPx(game.rows[0].canvasx/2, ball.rows[0].ball_id)
		await mouvBallPy(game.rows[0].canvasy/2, ball.rows[0].ball_id)
		await mouvGamePointPlayer1(game.rows[0].pointplayer1 + 1, game.rows[0].game_id)
	}
	else if (ball.rows[0].p_y <= 0 )
	{
		tmp = calX(ball);
		await mouvBallPy(1, ball.rows[0].ball_id)	
	}
	else if (ball.rows[0].p_y >= game.rows[0].canvasy)
	{
		tmp = calX(ball);
		await mouvBallPy(game.rows[0].canvasy - 1, ball.rows[0].ball_id)	
	}
	if (tmp != 0)
	{
		await mouvBallMx(tmp.bm_x, ball.rows[0].ball_id)	 
		await mouvBallMy(tmp.bm_y, ball.rows[0].ball_id)
	}
}

async function percutRaq(game)
{
	var tmp = await takeRaquette(game.rows[0].raquette1_id);
	var raquette1 = tmp.rows[0];
	tmp = await takeRaquette(game.rows[0].raquette2_id);
	var raquette2 = tmp.rows[0];
	tmp = await takeBall(game.rows[0].ball_id);
	var ball = tmp.rows[0]
	tmp = 0;
	if ((ball.p_x >= raquette1.p_x && ball.p_x <= raquette1.p_x + game.rows[0].blocksize
		&& ball.p_y >= raquette1.p_y && ball.p_y <= raquette1.p_y + raquette1.t_y)
		|| (ball.p_x >= raquette2.p_x && ball.p_x <= raquette2.p_x + game.rows[0].blocksize
		&& ball.p_y >= raquette2.p_y && ball.p_y <= raquette2.p_y + raquette2.t_y))
	{
		tmp = calY(await takeBall(game.rows[0].ball_id));
	}
	if (tmp != 0)
	{
		await mouvBallMx(tmp.bm_x, ball.ball_id)	 
		await mouvBallMy(tmp.bm_y, ball.ball_id)
	}
}

exports.mouvBall = async function(socket, data)
{
	var game = await takeGame(data.game.game_id);
	if (data.raq%2 == 0)
	{
		await percut(game);
		await percutRaq(game);
		var ball = await takeBall(game.rows[0].ball_id);
		await mouvBallPx(ball.rows[0].p_x + ball.rows[0].m_x, ball.rows[0].ball_id)	
		await mouvBallPy(ball.rows[0].p_y + ball.rows[0].m_y, ball.rows[0].ball_id)	
	}
	game = await takeGame(data.game.game_id);
	var ball = await takeBall(game.rows[0].ball_id);
	socket.emit('sendBall', {ball:ball,game:game.rows[0]});
}