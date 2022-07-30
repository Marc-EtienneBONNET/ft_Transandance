import { Typography } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState} from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { GameData } from "../../../../datamodels/game";
import { User } from "../../../../datamodels/user";
import { HeroContainer } from "../../PlayGame";
import DefaultAvatar from "../../../../images/DefaultAvatar.png"

var GameDataTmp = [
    {
        gameId: 0,
        gameUrl: 'test',
        firstPlayerName: 'jeanjacques',
        firstPlayerId: 0,
        firstPlayerScore: 100,
        secondPlayerName: 'michel',
        secondPlayerId: 1,
        secondPlayerScore: 0,
        winner: 0,
        loser: 1,
        currentlyGoingOn: false,
    },
    {
        gameId: 1,
        gameUrl: 'test',
        firstPlayerName: 'jeanjacques',
        firstPlayerId: 0,
        firstPlayerScore: 3,
        secondPlayerName: 'michel',
        secondPlayerId: 1,
        secondPlayerScore: 72,
        winner: 1,
        loser: 0,
        currentlyGoingOn: false,
    },
    {
        gameId: 2,
        gameUrl: 'test',
        firstPlayerName: 'jeanjacques',
        firstPlayerId: 0,
        firstPlayerScore: 32,
        secondPlayerName: 'michel',
        secondPlayerId: 1,
        secondPlayerScore: 21,
        winner: 0,
        loser: 1,
        currentlyGoingOn: false,
    },
]

// type PublicProfileProp = {
//     id: number;
//     username: string;
//     avatar: string;
//     numberWins: number;
//     numberLosses: number;
//     numberGamesPlayed: number;
// }

export const PublicProfile = (props: any) => {
    const {type} = useParams();
    const UserData = useLocation().state as User;
    
    const [user, setUser] = useState({username: "test", avatar:"test", id: 1});
    const [games, setGames] = useState(GameDataTmp);
    const [privateGame, setPrivateGame] = useState(false);
    const [unavailable, setUnunvailable] = useState(false);
    const [publicUser, setPublicUser] = useState(UserData);

    useEffect(() => {
        let bool = true;
        const getUser = async () => {
            const data = user; //await getUserData();
            if (bool)
                setUser(data);
        }
        getUser();
        return () => {bool = false};
    }, []);

    useEffect(() => {
        let bool = true;
        const getGameData = async () => {
            const data = GameDataTmp; //await getAllGamesFromDB();
            if (bool)
                setGames(data);
        }
        getGameData();
        return () => {bool = false};
    });

    const sendInvite = async (e: SyntheticEvent, id: number) => {
        e.preventDefault();
        try{
            // await postMessage('sendInvite', {id}));
            setPrivateGame(true);
        }
        catch (error) {
            setUnunvailable(true);
        }
    }

    const addFriend = async (e: SyntheticEvent, userId: number, friendId: number) => {
        e.preventDefault();
        // const ret = await postMessage("userAddFriend", {userId: userId, friendId: friendId,})
        // if (ret == SUCCESS)
        //     alert("You added a new friend");
    }

    const navigate = useNavigate();

    // if (privateGame)
    //     return navigate("/WaitingRoom", {type: "private"});

    return (
        <div className="container profilepage">
            
            <div className="row">
                <div className="row profile-content">
                    <div className="nameAvatar">
                        <div>
                            <img className="avatar" src={DefaultAvatar} alt=""></img>
                        </div>
                        <div>
                        <Typography fontSize={32} fontStyle="italic">{publicUser.username}</Typography>
                        </div>
                    </div>
                    <div className="row">
                        <table className="customTable">
                            <tbody>
                                <tr>
                                    <td><button onClick={(e) => {sendInvite(e, publicUser.id)}}>Invite for a game</button></td>
                                    <td> - </td>
                                    <td><button onClick={(e) => {addFriend(e, user.id, publicUser.id)}}>Invite as friend</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                            <Typography fontSize={32} fontStyle="italic">Player Games Statistics</Typography>
                    </div>
                    <div className="row">
                        <table className="customTable">
                            <thead>
                                <tr>
                                    <th>Games won</th>
                                    <th></th>
                                    <th>Games lost</th>
                                    <th></th>
                                    <th>Games Played</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{publicUser.numberWins}</td>
                                    <td> - </td>
                                    <td>{publicUser.numberLosses}</td>
                                    <td> - </td>
                                    <td>{publicUser.numberWins + publicUser.numberLosses}</td>    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className="row">
                            <Typography fontSize={32} fontStyle="italic">Player Games History</Typography>
                        </div>
                        <div className="row">
                            <table className="customTable">
                                <thead>
                                    <tr>
                                        <th>Game ID</th>
                                        <th>Player 1</th>
                                        <th> - </th>
                                        <th>Player 2</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {games.filter((game: GameData) => !game.currentlyGoingOn && (game.firstPlayerId === user.id || game.secondPlayerId === user.id)).map((gameData: GameData) => 
                                    <tr key={gameData.gameId}>
                                        <td>#{gameData.gameId}</td>
                                        <td>{gameData.firstPlayerName} - {gameData.firstPlayerScore}</td>
                                        <td> VS </td>
                                        <td>{gameData.secondPlayerName} - {gameData.secondPlayerScore}</td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}