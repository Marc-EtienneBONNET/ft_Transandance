import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import * as dataFc from "./../functionApi/fcForDatabase";
import { Server, Socket } from 'socket.io';
import { AppDataSource } from './../functionApi/connect';
import { DataSource, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
let structApiPong;
let myGame;
let myRaq1;
let myRaq2;
let myBall;

@WebSocketGateway({
	cors:{
		origin:"*",
	}
})
export class SocketEvents{
	@WebSocketServer()
	server: Server;
	handleConnection(client: Socket){
		console.log("Socket connecter coter server!");
	}
	handleDistConnection(client: Socket){
		console.log("Socket deconnecter coter server!");
	}
	@SubscribeMessage('Lancer de comunication')
	async handleEvent(@MessageBody() data: {id:number, name:string}, @ConnectedSocket() client: Socket)
	{
		console.log("BOnjour");
		await connectToDatabase();
		await searchGame(data);
		client.emit('update', {myGame, myRaq1, myRaq2})
		client.on('update', async () => {
			myGame = await dataFc.TakeGameById(structApiPong, myGame.id);
			myRaq1 = await dataFc.TakeRaquetteById(structApiPong, myGame.raq1);
			myRaq2 = await dataFc.TakeRaquetteById(structApiPong, myGame.raq2);
			myBall = await dataFc.TakeBallById(structApiPong, myGame.ball_id);
			client.emit('update', {myGame, myRaq1, myRaq2, myBall})
		})
		client.on('run', async () => {
			myGame = await dataFc.TakeGameById(structApiPong, myGame.id);
			myRaq1 = await dataFc.TakeRaquetteById(structApiPong, myGame.raq1);
			myRaq2 = await dataFc.TakeRaquetteById(structApiPong, myGame.raq2);
			myBall = await dataFc.TakeBallById(structApiPong, myGame.ball_id);
			client.emit('run', {myGame, myRaq1, myRaq2, myBall});
		})
		client.on('mouvBall', async (data) => {
			mouvBall(data.newX, data.newY);
		})
		client.on('mouvPoint', async (data) => {
			mouvPoint(data.point1, data.point2);
		})
		client.on('mouvWinner', async (data) => {
			mouvWinner(data.winner);
		})
		client.on('mouvRaq', async (data) => {
			mouvRaq(data);
		})
		client.on('end', async (data) => {
			end(data);
		})
	}
}

async function connectToDatabase()
{
	structApiPong = new DataSource({
		type: "postgres",
		host: "localhost",
		port: 5432,
		username: "postgres",
		password: "root",
		database: "transandance",
		synchronize: true,
		logging: false,
		entities: [dataFc.Raquettes, dataFc.Balls, dataFc.Users, dataFc.Games, dataFc.Historique],
	})
	await structApiPong.initialize()
	.then(() => {
		console.log("Nous voila connecter !");
	})
	.catch((error) => {console.log("il y a un probleme de connection : ", error);})
}


async function searchGame(data){
 	let tmpGame = await dataFc.TakeGameByRaq1(structApiPong);
	let raquette;
	if (tmpGame === null)
	 	tmpGame = await dataFc.TakeGameByRaq2(structApiPong);
	if (tmpGame === null)
	{
		await dataFc.insertGame(structApiPong, data.canvasX);
		tmpGame = await dataFc.TakeGameByRaq1(structApiPong);
	}
	raquette = await dataFc.insertRaquette(structApiPong, -1, tmpGame.canvasY/2 - (tmpGame.blocksize * (5 - tmpGame.dificult))/2, tmpGame.blocksize * (5 - tmpGame.dificult), data.user.id,false);
	if (tmpGame && tmpGame.raq1 === -1)
	{
		await dataFc.mouvGameRaq1(structApiPong, tmpGame,raquette.id);
		await dataFc.mouvRaquettePxById(structApiPong, tmpGame.raq1, tmpGame.blocksize);
		myRaq1 = await dataFc.TakeRaquetteById(structApiPong, tmpGame.raq1);
	}
	else
	{
		myBall = await dataFc.insertBall(structApiPong, tmpGame.canvasX/2, tmpGame.canvasY/2);
		await dataFc.mouvGameBallId(structApiPong, tmpGame,myBall.id);
		await dataFc.mouvGameRaq2(structApiPong, tmpGame, raquette.id);
		await dataFc.mouvRaquettePxById(structApiPong, tmpGame.raq2, tmpGame.canvasX - (tmpGame.blocksize*2));		
		myRaq2 = await dataFc.TakeRaquetteById(structApiPong, tmpGame.raq2);
	}
	myGame = tmpGame;
}

async function mouvBall(newX, newY)
{
	await dataFc.mouvBallPyById(structApiPong, myGame.ball_id, newY);
	await dataFc.mouvBallPxById(structApiPong, myGame.ball_id, newX);
}

async function mouvPoint(point1, point2)
{
	await dataFc.mouvGamePoint1ById(structApiPong, myGame, point1);
	await dataFc.mouvGamePoint2ById(structApiPong, myGame, point2);
}

async function mouvWinner(winner)
{
	if (winner === 1)
		await dataFc.mouvGameWinnerById(structApiPong, myGame, myRaq1.user_id);
	else if (winner === 2)
		await dataFc.mouvGameWinnerById(structApiPong, myGame, myRaq2.user_id);
}

async function mouvRaq(data)
{
	let pastP_y;
	
	if (data.witchRaq === 1)
	{
		pastP_y = (await dataFc.TakeRaquetteById(structApiPong, myGame.raq1)).p_y;
		await dataFc.mouvRaquettePyById(structApiPong, myGame.raq1, pastP_y + data.p_y)
	}
	else if (data.witchRaq === 2)
	{
		pastP_y = (await dataFc.TakeRaquetteById(structApiPong, myGame.raq2)).p_y;
		await dataFc.mouvRaquettePyById(structApiPong, myGame.raq2, pastP_y + data.p_y)
	}

}

async function end(data)
{
	await dataFc.insertHistorique(structApiPong, data);
	await dataFc.delateGame(structApiPong, myGame);
}

console.log("salut");