import { IAppContext } from "../contexts";
import { User } from "../datamodels/user"

class AppClient implements IAppContext {
    user: User;

    constructor() {
        this.user = {
            id: 0,
            username: "Marc-Eloi",
            numberWins: 100,
            numberLosses: 0,
            numberGamesPlayed: 100,
            isLoggedIn: true,
            twofa: true,
        };
    }
}

export default AppClient;