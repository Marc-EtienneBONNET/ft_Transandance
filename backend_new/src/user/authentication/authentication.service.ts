import { Body, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { authenticator } from "otplib";
import { UserService } from "../user.service";
import { RegisterDto, UpdateDto } from "./models/models";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async twoFactorAuthSecret(id: number) {
        const client = await this.userService.findOne(id);
        const secret = authenticator.generateSecret();
        await this.userService.saveTwoFactorSecret(secret, id);
        return authenticator.keyuri(client.email, 'ft_transcendence', secret);
    }

    async createQRcode(url: string) {
        var QR = require('qrcode');
        await QR.toFile('./uploads/qr.png', url);
        return {u: 'http://localhost:3000/api/uploads/qr.png'};
    }

    async twoFactorAuthVerify(code: string, id: number) {
        const client = await this.userService.findOne(id);
        return authenticator.verify({token: code, secret: client.twoFactorSecret})
    }

    async clientID(request: Request): Promise<number> {
        const cookie = request.cookies['clientID'];
        const data = await this.jwtService.verifyAsync(cookie);
        return data['id'];
    }

    async newUser(@Body() data: RegisterDto, clientID: number) {
        data.avatar = 'http://localhost:3000/api/uploads/DefaultAvatar.png';
        data.id = clientID;
        data.authentication = false;
        data.pendingInvite = false;
        data.status = 'ONLINE';
        await this.userService.create(data);
    }

    async updateUser(@Body() data: UpdateDto) {
        await this.userService.update(data.id, data);
    }
}