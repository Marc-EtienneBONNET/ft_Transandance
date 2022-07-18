import { StringifyOptions } from "querystring";

export type User = {
    id: string;
    name: string;
    password?: string;
    createdAt: Date;
    isAdmin: boolean;
    isLoggedIn: boolean;
    avatar?: string;
    status?: string;
    numberWins: number;
    numberLosses: number;
    numberGamesPlayed: number;
};

export default User;