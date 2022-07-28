/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   take.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/26 10:11:08 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/27 16:34:38 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var client1 = require('./../index');

exports.takeUsersDes = function()
{
	return (client1.client1.query(`SELECT * FROM users ORDER BY user_id DESC;`));
}

exports.takeUserDes = function()
{
	return (client1.client1.query(`SELECT * FROM users ;`));
}

exports.takeUserId = function(user_id)
{
	return (client1.client1.query(`SELECT * FROM users WHERE user_id=` + user_id + `;`));
}

exports.takeUserName = function(username)
{
	return (client1.client1.query(`SELECT * FROM users WHERE username=` + username + `;`));
}

exports.takeUserAvatar = function(avatar)
{
	return (client1.client1.query(`SELECT * FROM users WHERE avatar=` + avatar + `;`));
}

exports.takeUserNumberOfWine = function(numberofwine)
{
	return (client1.client1.query(`SELECT * FROM users WHERE numberofwine=` + numberofwine + `;`));
}

exports.takeUserNumberOfGame = function(numberofgame)
{
	return (client1.client1.query(`SELECT * FROM users WHERE numberofgame=` + numberofgame + `;`));
}

exports.takeUserConnect = function(connect)
{
	return (client1.client1.query(`SELECT * FROM users WHERE connect=` + connect + `;`));
}