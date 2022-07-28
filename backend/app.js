/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/14 16:36:04 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/28 17:47:51 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const WebSocketServer = require('websocket').server;
const express = require('express');
require('./database/index');
const app = express();
const server = require('http').createServer(app);

const port = process.env.PORT || 3000;
server.listen(port, () => {});

const wsServer = new WebSocketServer({
    httpServer: server,
});

var {initGames} = require('./backend/backend_pong/init');

wsServer.on('request', function(request) {
    var connection = request.accept('echo-protocol', request.origin);
    connection.on('message', function(message) {
		data = JSON.parse(message.utf8Data);
		if (data.type === "init")
		{
			initGames(wsServer);
		}
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
