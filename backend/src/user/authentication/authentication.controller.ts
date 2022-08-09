import { Body, Controller, Get, Post, Put, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Response, Request} from "express";
import { UserService } from "../user.service";
import { verifyUser } from "./intra-auth";
import { AuthService } from "./authentication.service";
import { RegisterModel } from "./models/models";

@Controller()
export class AuthController {
    constructor(
        
        private authService: AuthService,
        private userService: UserService,
        private jwtService: JwtService
    ) {}
    

    @UseGuards(AuthGuard('intra'))
    @Get('authentication/login')
    async login(@Req() request, @Res({passthrough: true}) response: Response) {
        await response.cookie('clientID', request.user, {httpOnly: true});
        const client = await this.jwtService.verifyAsync(request.user);
        const clientData = await this.userService.findOne(client.id);
        if (!clientData) {
            return response.redirect('http://localhost:3001/register')
        }
        else if (clientData.twofa == true) {
            return response.redirect('http://localhost:3001/2fasignin');
        }
        else {
            await this.userService.setOnline(client['id']);
            return response.redirect('http://localhost:3001/home')
        }
    }

    @UseGuards(verifyUser)
    @Get('2fa/generate')
    async activate2fa(@Req() request: Request) {
        const clientID = await this.authService.clientID(request);
        const url = await this.authService.generateTwoFactorAuthSecret(clientID);
        return this.authService.createQRImage(url);
    }

    @UseGuards(verifyUser)
    @Post('2fa/verify')
    async verify2fa(@Req() request: Request, @Body() data) {
        const clientID = await this.authService.clientID(request);
        const validation = await this.authService.verifyTwoFactorSecret(data.code, clientID);
        if (!validation)
            throw new UnauthorizedException('Wrong authentication code');
        else
            await this.userService.enableTwoFactor(clientID);
        return (true);
    }

    @UseGuards(verifyUser)
    @Post('2fa/login')
    async login2fa(@Req() request: Request, @Body() data) {
        const client = await this.authService.clientID(request);
        const validation = await this.authService.verifyTwoFactorSecret(data.code, client);
        if (!validation)
            throw new UnauthorizedException('Wrong authentication code');
    }

    @UseGuards(verifyUser)
    @Post('2fa/disable')
    async disable2fa(@Req() request: Request, @Body() data) {
        const clientID = await this.authService.clientID(request);
        await this.userService.disableTwoFactor(clientID);
        return (true);
    }

    @UseGuards(verifyUser)
    @Post('register')
    async register(@Body() data: RegisterModel, @Req() request: Request) {
        const clientID = await this.authService.clientID(request);
        await this.authService.newUser(data, clientID);
    }

    @UseGuards(verifyUser)
    @Put('acceptGameInvite')
    async acceptGameInvite(@Req() request: Request, @Body() data): Promise<any> {
        return await this.userService.acceptGameInvite(data);
    }

    @UseGuards(verifyUser)
    @Get('userData')
    async getUserData(@Req() request: Request, @Body() data) {
        const clientID = await this.authService.clientID(request);
        return await this.userService.findOne(clientID);
    }

    @UseGuards(verifyUser)
    @Post('logout')
    async logout(@Req() request: Request, @Res({passthrough: true}) response: Response) {
        response.clearCookie('clientID');
        const clientID = await this.authService.clientID(request);
        await this.userService.setOffline(clientID);
        return {message: 'Success'};
    }

    @UseGuards(verifyUser)
    @Post('setOnline')
    async setOnline(@Req() request: Request) {
        const clientID = await this.authService.clientID(request);
        await this.userService.setOnline(clientID);
    }
}