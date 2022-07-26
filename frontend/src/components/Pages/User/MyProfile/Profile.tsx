import { LooksTwoTone } from "@material-ui/icons";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { GameData } from "../../../../datamodels/game";
import { HeroContainer } from "../../PlayGame";

export const Profile = () => {
    const [played, setPlayed] = useState(0);
    const [wins, setWins] = useState(0);
    const [looses, setLooses] = useState(0);
    const [pendingInvite, setPendingInvite] = useState(false);
    const [friends, setFriends] = useState([]);
    const [user, setUser] = useState({username: 'test', avatar: 'test', id: 0, pendingInvite: false,});
    const [games, setGames] = useState([]);
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
            const data = friends; //await getUserFriends();
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
            const data = games; //await getUserFriends();
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
    }

    const removeFriend = async (e: SyntheticEvent, userId: number, friendId: number) => {
        e.preventDefault();

        // const ret = await post('deleteFriend', {userId: userId, friendId: friendId,});
        // if (ret === Success)
        //     alert("You've removed this friend")
        // window.location.reload();
    }

    return (
        <HeroContainer>

        </HeroContainer>
    )
}