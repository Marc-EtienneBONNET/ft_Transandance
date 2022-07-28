/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/26 11:55:50 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/27 18:32:24 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var client1 = require('./../index');

exports.CreateTableGames = async function(name)
{
	await client1.client1.query(`CREATE TABLE games(
		game_id SERIAL PRIMARY KEY,
		raquette1_id INT REFERENCES raquettes,
		raquette2_id INT REFERENCES raquettes,
		ball_id INT REFERENCES balls,
		canvasX INT,
		canvasY INT,
		blocksize INT,
		pointPlayer1 INT,
		pointPlayer2 INT,
		dificult INT,
		fin BOOL
	);`);
}

exports.CreateTablePlayers = async function(name)
{
	await client1.client1.query( `CREATE TABLE players(
		player_id SERIAL PRIMARY KEY,
		type VARCHAR(10),
		raquette_id INT REFERENCES raquettes
	);`);
}

exports.CreateTableRaquettes = async function(name)
{
	await client1.client1.query( `CREATE TABLE raquettes(
		raquette_id SERIAL PRIMARY KEY,
		p_X INT,
		p_Y INT,
		t_Y INT,
		connect BOOL
	);`);
}

exports.CreateTableBalls = async function(name)
{
	await client1.client1.query( `CREATE TABLE balls(
			ball_id SERIAL PRIMARY KEY,
			p_X INT,
			p_Y INT,
			m_X INT,
			m_Y int
		);`);
}

