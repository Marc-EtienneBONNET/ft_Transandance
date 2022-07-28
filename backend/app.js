/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/14 16:36:04 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/28 19:28:25 by mbonnet          ###   ########.fr       */
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
var {checkPlay, drawScorAndDeco} = require('./backend/backend_pong/utile');
var {sendRaquette, mouvRaquette} = require('./backend/backend_pong/raquette');
var {end, prematurEnd} = require('./backend/backend_pong/end');
var {mouvBall} = require('./backend/backend_pong/ball');


var id_game;
wsServer.on('request', function(request) {
    var connection = request.accept('echo-protocol', request.origin);
    connection.on('message', function(message) {
		data = JSON.parse(message.utf8Data);
		if (data.type === "init")
			initGames(connection);
		if (data.type === "callRaquette")
			sendRaquette(connection,data.game)
		if (data.type === "callPlay")
		{
		 	checkPlay(connection, data);
		 	idGame = data;
		}
		if (data.type === "end")
			end(connection, data);
		if (data.type === "callMouvBall")
			mouvBall(connection, data);
		if (data.type === "drawScorAndDeco")
			drawScorAndDeco(connection, data);	
		if (data.type === "callMouvRaq")
			mouvRaquette(connection,data);

    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
