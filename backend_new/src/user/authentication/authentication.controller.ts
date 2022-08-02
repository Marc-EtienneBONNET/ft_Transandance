import { Body, Controller, Get, Post, Put, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Response, Request} from "express";
import { UserService } from "../user.service";
import { verifyUser } from "./authentication.guard";
import { AuthService } from "./authentication.service";
import { RegisterDto } from "./models/models";

@Controller()
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private authService: AuthService
    ) {}

    @UseGuards(AuthGuard('intra'))
    @Get('auth/login')
    async login(@Req() req, @Res({passthrough: true}) response: Response) {
        await response.cookie('clientID', req.user, {httpOnly: true});
        const client = await this.jwtService.verifyAsync(req.user);
        const clientData = await this.userService.findOne(client['id']);
        if (!clientData) {
            return response.redirect('http://localhost:3000/register')
        }
        else {
            await this.userService.setOnline(client['id']);
        }
        if (clientData.authentication == true) {
            return response.redirect('http://localhost:3000/twofactor');
        }
        else {
            return response.redirect('http://localhost:3000/home')
        }
    }

    @UseGuards(verifyUser)
    @Get('2fa/generate')
    async activate2fa(@Req() request: Request) {
        const clientID = await this.authService.clientID(request);
        const url = await this.authService.twoFactorAuthSecret(clientID);
        return this.authService.createQRcode(url);
    }

    @UseGuards(verifyUser)
    @Post('2fa/verify')
    async verify2fa(@Req() request: Request, @Body() data) {
        const clientID = await this.authService.clientID(request);
        const validation = await this.authService.twoFactorAuthVerify(data.code, clientID);
        if (!validation)
            throw new UnauthorizedException('Wrong authentication code');
        else
            await this.userService.enableTwoFactor(clientID);
        return (true);
    }

    @UseGuards(verifyUser)
    @Post('2fa/login')
    async login2fa(@Req() request: Request, @Body() data) {
        const clientID = await this.authService.clientID(request);
        const validation = await this.authService.twoFactorAuthVerify(data.code, clientID);
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
    async register(@Body() data: RegisterDto, @Req() request: Request) {
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
    @Post('publicUserData')
    async getPublicUserData(@Req() request: Request, @Body() data) {
        return await this.userService.findOne(data.id)
    }

    @UseGuards(verifyUser)
    @Post('logout')
    async logout(@Req() request: Request, @Res({passthrough: true}) response: Response) {
        response.clearCookie('clientID');
        const clientID = await this.authService.clientID(request);
        await this.userService.setOffline(clientID);
        return {message: 'Success'};
    }
}