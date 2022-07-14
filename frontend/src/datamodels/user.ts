export type User = {
    id: string;
    name: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    isActive: boolean;
    isAdmin: boolean;
    isLoggedIn: boolean;
    numberWins: number;
    numberLosses: number;
    numberGamesPlayed: number;
    avatar?: string;
};

export default User;