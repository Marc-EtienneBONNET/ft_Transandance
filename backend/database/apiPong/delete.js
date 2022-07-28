/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   delete.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/26 11:20:47 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/27 17:00:59 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var client1 = require('./../index');

exports.DeleteAllTableByName = async function(name)
{
	await client1.client1.query(`DROP TABLE ` + name + `;`);
}

exports.DeleteOneRaquette = async function(raquette_id)
{
	await client1.client1.query(`DELETE FROM raquettes WHERE raquette_id=` + raquette_id + `;`);
}

exports.DeleteOneBall = async function(ball_id)
{
	await client1.client1.query(`DELETE FROM balls WHERE ball_id=` + ball_id + `;`);
}

exports.DeleteOneGame = async function(game_id)
{
	await client1.client1.query(`DELETE FROM games WHERE game_id=` + game_id + `;`);
}
