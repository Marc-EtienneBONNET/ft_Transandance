import { IAppContext } from "../contexts";
import { User } from "../datamodels/user"

class AppClient implements IAppContext {
    user: User;

    constructor() {
        this.user = {
            id: "1234",
            name: "Je suis une banane",
            password: "password",
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
            isAdmin: true,
            numberWins: 100,
            numberLosses: 0,
            numberGamesPlayed: 100,
            isLoggedIn: true,
        };
    }
}

export default AppClient;