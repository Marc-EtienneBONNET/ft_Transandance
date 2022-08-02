import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PassportStrategy } from "@nestjs/passport"
import { timeStamp } from "console"
import { Strategy } from "passport-oauth2"
import { stringify } from "querystring"
import { AuthService } from "./authentication.service"

const uid = '1d7e9bf203617a46828968923d537bc2cb3b804626778d4da1813a9d24553987'
const secret = '9ecbac68db0206b48495eb007f6835ba5abe67bd1c83772f3558c5588c43c5f8'
const redirect = 'http://localhost:3000/api/auth/login'
const state = 'xqm5wXX'

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy, 'intra') {
    constructor (
        private authService: AuthService,
        private http: HttpService,
        private jwtService : JwtService
    ) {
        super({
            authorizationURL: `https://api.intra.42.fr/oauth/authorize?${ stringify({
                client_id     : uid,
                redirect_uri  : redirect,
                scope         : 'public',
                state         : state,
                response_type : 'code',
            }) }`,
        tokenURL : 'https://api.intra.42.fr/oauth/token',
        clientID : uid,
        clientSecret : secret,
        callbackURL : redirect,
        scope : 'public',
        });
    }

    async validate(accessToken: string): Promise<any> {
        const data = await this.http.get('https://api.intra.42.fr/v2/me', {
            headers: { Authorization: `Bearer ${ accessToken }` },}).toPromise();
            const jwt = await this.jwtService.signAsync({id: data.data.id});
            return jwt;
    }
}