/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/18 14:40:34 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/28 07:57:01 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const {Client} = require('pg');

const client1 = new Client({
	host:"localhost",
	user:"postgres",
	password:"root",
	database:"pong",
	port:5432
});

client1.connect()
.then(() => {
	console.log("Nous voila connectez !");
})
.catch(err => {
	console.log("erreur de connection : " + err);
});

module.exports = {client1:client1}