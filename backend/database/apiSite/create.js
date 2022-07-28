/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/26 11:55:50 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/27 16:32:30 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var client1 = require('./../index');

exports.CreateTableUsers = async function()
{
	await client1.client1.query(`CREATE TABLE users(
		user_id SERIAL PRIMARY KEY,
		username VARCHAT(30),
		avatar VARCHAT(100),
		numberofwine INT,
		numberofgame INT,
		connect BOOL
	);`);
}