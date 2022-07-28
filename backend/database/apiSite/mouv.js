/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   mouv.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/26 10:44:49 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/27 16:37:37 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var client1 = require('./../index');

exports.mouvUserName = async function(username, user_id)
{
	await client1.client1.query(`UPDATE users SET username=` + username + ` 
								WHERE user_id=` + user_id + `;`);
}

exports.mouvUserAvatar = async function(avatar, user_id)
{
	await client1.client1.query(`UPDATE users SET avatar=` + avatar + ` 
								WHERE user_id=` + user_id + `;`);
}

exports.mouvUserNumberOfWine = async function(numberofwine, user_id)
{
	await client1.client1.query(`UPDATE users SET numberofwine=` + numberofwine + ` 
								WHERE user_id=` + user_id + `;`);
}

exports.mouvUserNumberOfGame = async function(numberofgame, user_id)
{
	await client1.client1.query(`UPDATE users SET numberofgame=` + numberofgame + ` 
								WHERE user_id=` + user_id + `;`);
}

exports.mouvUserConnect = async function(connect, user_id)
{
	await client1.client1.query(`UPDATE users SET connect=` + connect + ` 
								WHERE user_id=` + user_id + `;`);
}