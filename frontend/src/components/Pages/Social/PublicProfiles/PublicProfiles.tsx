import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import User from "../../../../datamodels/user";
import "./style/style.css"

var UsersTmp = [
    {
        id: 0,
        username: 'Yves',
        avatar: 'test',
        numberWins: 12,
        numberLosses: 32,
        numberGamesPlayed: 44,
    },
    {
        id: 1,
        username: 'Marco1',
        avatar: 'test',
        numberWins: 12,
        numberLosses: 32,
        numberGamesPlayed: 44,
    },
    {
        id: 2,
        username: 'Marco2',
        avatar: 'test',
        numberWins: 2,
        numberLosses: 32,
        numberGamesPlayed: 44,
    },
    {
        id: 3,
        username: 'Jeas-Sebastopol',
        avatar: 'test',
        numberWins: 4,
        numberLosses: 32,
        numberGamesPlayed: 44,
    },
    {
        id: 4,
        username: 'Henri',
        avatar: 'test',
        numberWins: 86,
        numberLosses: 32,
        numberGamesPlayed: 44,
    },
    {
        id: 5,
        username: 'Jaques',
        avatar: 'test',
        numberWins: 1211,
        numberLosses: 32,
        numberGamesPlayed: 44,
    },
    {
        id: 6,
        username: 'Michel',
        avatar: 'test',
        numberWins: 0,
        numberLosses: 32,
        numberGamesPlayed: 44,
    },
]

export const PublicProfiles = () => {
    const [user, setUser] = useState({id: 0,});
    const [users, setUsers] = useState(UsersTmp);

    useEffect(() => {
        let bool = false;
        const getUser = async () => {
            const data = UsersTmp[0];//getUsersFromDB();
            setUser(data);
        }
        getUser();
        return () => {bool = false;}
    }, []);

    useEffect(() => {
        let bool = false;
        const getUsers = async () => {
            const data = UsersTmp;//getUsersFromDB();
            setUsers(UsersTmp);
        }
        getUsers();
        return () => {bool = false;}
    }, []);

    return (
        <main className="PublicProfilesComponent">
            <div className="profiles">
                <table>
                    <thead></thead>
                    <tbody>
                        {users.filter((users) => users.id !== user.id).map((usersData) =>

                            <tr key={usersData.id} className="users-table">
                                <td><img src={`${usersData?.avatar}`} className="avatarIMG" alt=""></img></td>
                                <td> - </td>
                                <td>{usersData.username}</td>
                                <td> - </td>
                                <td>{usersData.numberWins} wins</td>
                                <td> - </td>
                                <td><Link to={"/social/publicprofile"} state={usersData} type="button" className="customButton">See profile</Link></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    )
}