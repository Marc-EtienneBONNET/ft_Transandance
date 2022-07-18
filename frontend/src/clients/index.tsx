import { IAppContext } from "../contexts";
import { User } from "../datamodels/user"

class AppClient implements IAppContext {
    user: User;

    constructor() {
        this.user = {
            id: "1234",
            name: "Marc-Eloi",
            password: "password",
            createdAt: new Date(),
            isAdmin: true,
            numberWins: 100,
            numberLosses: 0,
            numberGamesPlayed: 100,
            isLoggedIn: false,
        };
    }
}

export default AppClient;