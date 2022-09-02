import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Games, Balls, Raquettes, Historique } from './game.entity';
import { User } from './../user/user.entity';
import { Server, Socket } from 'socket.io';
import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import axios from "axios";



@WebSocketGateway({
	cors:{
		origin:"*",
	}
})
@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Games) private readonly GamesRepository: Repository<Games>,
        @InjectRepository(Balls) private readonly BallsRepository: Repository<Balls>,
        @InjectRepository(User) private readonly UserRepository: Repository<User>,
        @InjectRepository(Raquettes) private readonly RaquettesRepository: Repository<Raquettes>,
        @InjectRepository(Historique) private readonly HistoriqueRepository: Repository<Historique>
    ) {}
    myGame;
    myRaq1;
    myRaq2;
    myBall;

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
    //@@@@@@@@@@@@@@@@@@@@@ deb des insert @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

    //@@@@@@@@@@@@@@@@@@@@@ insert game @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

    async insertGame(canvasX, dificult, priv, invite){
        const GameTmp: Games = new Games();
        GameTmp.ball_id = -1;
        GameTmp.canvasX = canvasX;
        GameTmp.canvasY = canvasX*0.6;
        GameTmp.blocksize = canvasX/50;
        GameTmp.raq1 = -1;
        GameTmp.raq2 = -1;
        GameTmp.point1 = 0;
        GameTmp.point2 = 0;
        GameTmp.dificult = dificult;
        GameTmp.winner = -1;
        GameTmp.private = priv;
        GameTmp.invite = invite;
        GameTmp.timeStart = new Date();
        await this.GamesRepository.save(GameTmp);
        return (GameTmp);
    }

//@@@@@@@@@@@@@@@@@@@@@ insert raquette @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

    async insertRaquette(p_x : number, p_y : number, t_y : number,  user_id : number, connect: boolean){
        const RaquetteTmp: Raquettes = new Raquettes();
        RaquetteTmp.p_x = p_x;
        RaquetteTmp.p_y = p_y;
        RaquetteTmp.t_y = t_y;
        RaquetteTmp.user_id = user_id;
        RaquetteTmp.connect = connect;
        await this.RaquettesRepository.save(RaquetteTmp);
        return (RaquetteTmp);
    }


//@@@@@@@@@@@@@@@@@@@@@ insert ball @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

    async insertBall(p_x : number, p_y : number){
        const ballTmp: Balls = new Balls();
        ballTmp.p_x = p_x;
        ballTmp.p_y = p_y;
        await this.BallsRepository.save(ballTmp);
        return (ballTmp);
    }

    async insertHistorique(data){
        const histTmp: Historique = new Historique();
        histTmp.coter_winner = data.coter_winner;
        histTmp.winner_id = data.winner_id;
        histTmp.winner_name = data.winner_name;
        histTmp.looser_id = data.looser_id;
        histTmp.looser_name = data.looser_name;
        histTmp.winner_point = data.winner_point;
        histTmp.looser_point = data.looser_point;
        histTmp.dificult = data.dificult;
        await this.HistoriqueRepository.save(histTmp);
        return (histTmp);
    }

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@ fin des insert @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@ deb des take   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

    async TakeGame(){
        let Games = await this.GamesRepository.find()
        return (Games);
    }
    async TakeGameByRaq1(dif){
        let Game = await this.GamesRepository.findOneBy({
            raq1 : -1,
            private : false,
            dificult : dif
        })
        return (Game);
    }

    async TakeGameById(id: number){
        let Game = await this.GamesRepository.findOneBy({
            id : id,
        })
        return (Game);
    }

    async TakeGameByRaq2(dif){
        var Game = await this.GamesRepository.findOneBy({
            raq2 : -1,
            private : false,
            dificult : dif
        })
        return (Game);
    }

    async TakeRaquetteByConnect(){
        var Game = await this.RaquettesRepository.findOneBy({
            connect : false,
        })
        return (Game);
    }

    async TakeRaquetteById(id: number){
        var raq = await this.RaquettesRepository.findOneBy({
            id : id
        })
        return (raq);
    }

    async TakeBallById(id: number){
        var raq = await this.BallsRepository.findOneBy({
            id : id
        })
        return (raq);
    }

    async TakeUserById(id: number){
        var res = await this.UserRepository.findOneBy({
            id: id, 
        })
        return (res);
    }

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@ fin des take @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@ deb des mouv   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

    async mouvGameRaq1(game: Games, raq1: number){
        game.raq1 = raq1;
        this.GamesRepository.save(game)
    }

    async mouvGameRaq2(game: Games, raq2: number){
        game.raq2 = raq2;
        this.GamesRepository.save(game)
    }

    async mouvGameBallId(game: Games, ball_id: number){
        game.ball_id = ball_id;
        this.GamesRepository.save(game)
    }

    async mouvRaquettePxById(raq_id: number, p_x: number){
        let raq = await this.TakeRaquetteById(raq_id);
        raq.p_x = p_x;
        this.RaquettesRepository.save(raq);
    }
    async mouvRaquettePyById(raq_id: number, p_y: number){
        let raq = await this.TakeRaquetteById(raq_id);
        raq.p_y = p_y;
        this.RaquettesRepository.save(raq);
    }
    async mouvRaquetteTyById(raq_id: number, t_y: number){
        let raq = await this.TakeRaquetteById(raq_id);
        raq.t_y = t_y;
        this.RaquettesRepository.save(raq);
    }

    async mouvBallPyById(ball_id: number, p_y: number){
        let ball = await this.TakeBallById(ball_id);
        ball.p_y = p_y;
        this.BallsRepository.save(ball);
    }

    async mouvBallPxById(ball_id: number, p_x: number){
        let ball = await this.TakeBallById(ball_id);
        ball.p_x = p_x;
        this.BallsRepository.save(ball);
    }


    async mouvGamePoint1ById(game: Games, point: number){
        let mygame = await this.TakeGameById(game.id);
        mygame.point1 = point;
        this.GamesRepository.save(mygame);
    }
    async mouvGamePoint2ById(game: Games, point: number){
        let mygame = await this.TakeGameById(game.id);
        mygame.point2 = point;
        this.GamesRepository.save(mygame);
    }

    async mouvGameWinnerById(game: Games, winner: number){
        let mygame = await this.TakeGameById(game.id);
        if (mygame)
        {
            mygame.winner = winner;
            this.GamesRepository.save(mygame);
        }
    }

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@ fin des take @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@ deb des mouv   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

    async delateGame(game: Games)
    {
        let id_game = await this.TakeGameById(game.id);
        let id_raq1 = await this.TakeRaquetteById(game.raq1);
        let id_raq2 = await this.TakeRaquetteById(game.raq2);	;
        let id_ball = await this.TakeBallById(game.ball_id);
        
        if (id_game)
            await this.GamesRepository.remove(id_game);	
        if (id_raq1)
            await this.RaquettesRepository.remove(id_raq1);	
        if (id_raq2)    
            await this.RaquettesRepository.remove(id_raq2);	
        if (id_ball)
            await this.BallsRepository.remove(id_ball);
    }
    @WebSocketServer()
	server: Server;
	handleConnection(client: Socket){
		console.log("Socket connecter coter server : " + client.id);
	}
	handleDisConnect(client: Socket){
		console.log("Socket deconnecter coter server!");
	}
	@SubscribeMessage('Lancer de comunication')
	async handleEvent(@MessageBody() data, @ConnectedSocket() client: Socket)
	{
        await this.CleanGame(client, data);
        await this.searchGame(data, client);
        client.emit('initGame', {canvas:this.myGame.canvasX})
        client.emit('update', {myGame:this.myGame, myRaq1:this.myRaq1, myRaq2:this.myRaq2})
        client.on('update', async () => {
            this.myGame = await this.TakeGameById(this.myGame.id);
            this.myRaq1 = await this.TakeRaquetteById(this.myGame.raq1);
            this.myRaq2 = await this.TakeRaquetteById(this.myGame.raq2);
            this.myBall = await this.TakeBallById(this.myGame.ball_id);
            client.emit('update', {myGame:this.myGame, myRaq1:this.myRaq1, myRaq2:this.myRaq2, myBall:this.myBall})
        })
        client.on('run', async () => {
            this.myGame = await this.TakeGameById(this.myGame.id);
            this.myRaq1 = await this.TakeRaquetteById(this.myGame.raq1);
            this.myRaq2 = await this.TakeRaquetteById(this.myGame.raq2);
            this.myBall = await this.TakeBallById(this.myGame.ball_id);
		 	client.emit('run', {myGame:this.myGame, myRaq1:this.myRaq1, myRaq2:this.myRaq2, myBall:this.myBall});
	    })
		client.on('mouvBall', async (data) => {
		 	this.mouvBall(data.newX, data.newY);
		})
		client.on('mouvPoint', async (data) => {
		 	this.mouvPoint(data.point1, data.point2);
		})
		client.on('mouvWinner', async (data) => {
		 	this.mouvWinner(data.winner);
		})
		client.on('mouvRaq', async (data) => {
		 	this.mouvRaq(data);
		})
		client.on('end', async (data) => {
		 	this.end(client, data);
		})
        client.on('disconnect', async (data) => {
            this.mouvWinner(0);
       })
       client.on('user', async (data) => {
            var user_win = await this.TakeUserById(data.id_win);
            var user_loo = await this.TakeUserById(data.id_loo);
            client.emit('user', {winner:user_win, looser:user_loo});
        })
    }
    
    async searchGame(data, client){
        let tmpGame;
        let raquette;
        let raqCheck;
        if (data.gameId > 0)
        {
            tmpGame = await this.TakeGameById(data.gameId);
        }
        else if (data.gameId === -1)
        {
            tmpGame = await this.insertGame(data.canvasX, data.type, true, data.invitationId);
            client.emit('invitation', {userID: data.invitationId, gameID:tmpGame.id, userInviteID:data.userId});
        }
        else
        {
            tmpGame = await this.TakeGameByRaq1(data.type);
            if 	(tmpGame === null || tmpGame.raq1 == -1)
            {
                tmpGame = await this.TakeGameByRaq2(data.type);
                if (tmpGame != null)
                    raqCheck = await this.TakeRaquetteById(tmpGame.raq1);
            }	
            if (tmpGame === null  || raqCheck.user_id === data.userId)
                tmpGame = await this.insertGame(data.canvasX, data.type, false,-1);
        }
        if (tmpGame.raq1 === -1)
        {
            this.myBall = await this.insertBall(tmpGame.canvasX/2, tmpGame.canvasY/2); 
            await this.mouvGameBallId(tmpGame, this.myBall.id);
            raquette = await this.insertRaquette(tmpGame.blocksize ,tmpGame.canvasY/2 - (tmpGame.blocksize * (5 - tmpGame.dificult))/2, tmpGame.blocksize * (5 - tmpGame.dificult), data.userId ,false);
            await this.mouvGameRaq1(tmpGame,raquette.id);
            this.myRaq1 = raquette;
        }
        else if (tmpGame.raq2 === -1)
        {
            raquette = await this.insertRaquette(tmpGame.canvasX - (tmpGame.blocksize * 2),tmpGame.canvasY/2 - (tmpGame.blocksize * (5 - tmpGame.dificult))/2, tmpGame.blocksize * (5 - tmpGame.dificult), data.userId ,false);
            await this.mouvGameRaq2(tmpGame,raquette.id);
            this.myRaq2 = raquette;
        }
        this.myGame = tmpGame;
    }

    async mouvBall(newX, newY)
    {
        await this.mouvBallPyById(this.myGame.ball_id, newY);
        await this.mouvBallPxById(this.myGame.ball_id, newX);
    }

    async mouvPoint(point1, point2)
    {
        await this.mouvGamePoint1ById(this.myGame, point1);
        await this.mouvGamePoint2ById(this.myGame, point2);
    }

    async mouvWinner(winner)
    {
        if (winner === 1)
            await this.mouvGameWinnerById(this.myGame, this.myRaq1.user_id);
        else if (winner === 2)
            await this.mouvGameWinnerById(this.myGame, this.myRaq2.user_id);
        else if (winner === 0)
            await this.mouvGameWinnerById(this.myGame, 0);
    }

    async mouvRaq(data)
    {
        let pastP_y;
        
        if (data.witchRaq === 1)
        {
            pastP_y = (await this.TakeRaquetteById(this.myGame.raq1)).p_y;
            await this.mouvRaquettePyById(this.myGame.raq1, pastP_y + data.p_y)
        }
        else if (data.witchRaq === 2)
        {
            pastP_y = (await this.TakeRaquetteById(this.myGame.raq2)).p_y;
            await this.mouvRaquettePyById(this.myGame.raq2, pastP_y + data.p_y)
        }

    }

    async end(client, data)
    {
        let res = await this.insertHistorique(data);
        await this.delateGame(this.myGame);
        client.emit('messageEnd',res);
    }

    async CleanGame(client, data)
    {
        let date = new Date();
        let games = await this.TakeGame();
        games.forEach(async (game) => {
            if (date.valueOf() - game.timeStart.valueOf() > 4000000)
               await this.delateGame(game);
            if (game.winner != -1)
               await this.delateGame(game);
            if (game.private === true && date.valueOf() - game.timeStart.valueOf() > 600000)
            {
                client.emit('invitation', {userID:game.invite, gameID:-1, userInviteID:-1});
                await this.delateGame(game);
            }
            if (game.raq2 === -1 && date.valueOf() - game.timeStart.valueOf() > 600000)
            {
                await this.delateGame(game);
            }
            if (game.raq1 === -1 && game.raq2 === -1)
               await this.delateGame(game);
        })
    }

    async getGameHistoric() {
        return this.HistoriqueRepository.find();
    }
}



