/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   insert.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/26 10:44:49 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/26 15:47:20 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var client1 = require('./../index');

//fonction de modification des valeur de raquette 
exports.insertRaquette = async function(px, raquette_id)
{
	await client1.client1.query(`INSERT INTO raquettes(p_x) VALUES(0);`);
}

exports.insertBall = async function(px, ball_id)
{
	await client1.client1.query(`INSERT INTO balls(p_x) VALUES(0);`);
}

exports.insertGame = async function(raquette1_id, game_id)
{
	await client1.client1.query(`INSERT INTO games(dificult) VALUES(1);`);
}

