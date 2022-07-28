import { Typography } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { GameData } from "../../../../datamodels/game";
import { User } from "../../../../datamodels/user";
import { HeroContainer } from "../../PlayGame";

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

var FriendTmp = [
    {
        id: 1,
        username: "Michel",
        isAdmin: false,
        isLoggedIn: true,
        avatar: "test",
        status: "online",
        numberWins: 0,
        numberLosses: 0,
        numberGamesPlayed: 0,
    },
    {
        id: 1,
        username: "Jean",
        isAdmin: false,
        isLoggedIn: true,
        avatar: "test",
        status: "online",
        numberWins: 0,
        numberLosses: 0,
        numberGamesPlayed: 0,
    },
    {
        id: 1,
        username: "Pierre",
        isAdmin: false,
        isLoggedIn: true,
        avatar: "test",
        status: "online",
        numberWins: 0,
        numberLosses: 0,
        numberGamesPlayed: 0,
    }
]

export const Profile = () => {
    const [played, setPlayed] = useState(0);
    const [wins, setWins] = useState(0);
    const [looses, setLooses] = useState(0);
    const [pendingInvite, setPendingInvite] = useState(false);
    const [friends, setFriends] = useState(FriendTmp);
    const [user, setUser] = useState({username: 'test', avatar: 'test', id: 0, pendingInvite: false,});
    const [games, setGames] = useState(GameDataTmp);
    const [privateGame, setPrivateGame] = useState(false);


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
        const getFriends = async () => {
            const data = FriendTmp; //await getUserFriends();
            if (bool)
                setFriends(data);
        }
        getFriends();
        return () => {bool = false};
    }, [user]);

    useEffect(() => {
        let bool = true;
        const getPendingInvite = async () => {
            const data = pendingInvite; //await getUserPendingInvite();
            if (bool)
                setPendingInvite(data);
        }
        getPendingInvite();
        return () => {bool = false};
    }, [user]);

    useEffect(() => {
        let bool = true;
        const getGameData = async () => {
            const data = GameDataTmp; //await getGames();
            if (bool)
                setGames(data);
        }
        getGameData();
        return () => {bool = false};
    });

    useEffect(() => {
        let bool = true;
        let count = 0;

        const getGamesWon = async () => {
            games.filter((game: GameData) => !game.currentlyGoingOn && game.winner === user.id).map((gameData: GameData) => 
                count++
            )
            if (bool)
                setWins(count);
        }
        getGamesWon();
        return () => {bool = false;}
    }, [user.id, games]);

    useEffect(() => {
        let bool = true;
        let count = 0;

        const getGamesLost = async () => {
            games.filter((game: GameData) => !game.currentlyGoingOn && game.winner !== user.id).map((gameData: GameData) => 
                count++
            )
            if (bool)
                setLooses(count);
        }
        getGamesLost();
        return () => {bool = false;}
    }, [user.id, games]);

    useEffect(() => {
        let count = 0;
        const getPlayed = async () => {
            count = wins + looses;
            setPlayed(count);
        }
        getPlayed();
    }, [looses, wins]);

    const acceptInvite = async (e: SyntheticEvent) => {
        e.preventDefault();
        // await postMessage('acceptInvite');
        setPrivateGame(true);
    }

    const removeFriend = async (e: SyntheticEvent, userId: number, friendId: number) => {
        e.preventDefault();

        // const ret = await post('deleteFriend', {userId: userId, friendId: friendId,});
        // if (ret === Success)
        //     alert("You've removed this friend")
        // window.location.reload();
    }

    return (
        <div className="container profilepage">
            <div className="row">
                <div className="row profile-content">
                    <div className="row">
                            <Typography fontSize={32} fontStyle="italic">Games Statistics</Typography>
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
                                    <td>{wins}</td>
                                    <td> - </td>
                                    <td>{looses}</td>
                                    <td> - </td>
                                    <td>{played}</td>    
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className="row">
                            <Typography fontSize={32} fontStyle="italic">Games History</Typography>
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
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <Typography fontSize={32} fontStyle="italic">Friends</Typography>
                    </div>
                    <div className="row">
                        <table className="customTable">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Username</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {friends.map((friend) =>
                                <tr key={friend.id}>
                                    <td><img src={`${friend.avatar}`} className="friendAvatar" alt=""></img></td>
                                    <td>{friend.username}</td>
                                    <td>{friend.status}</td>
                                    <td><button onClick={(e) => {removeFriend(e, user.id, friend.id)}} type="button" className="buttonRemove">Remove Friend</button></td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}