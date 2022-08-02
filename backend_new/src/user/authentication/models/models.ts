import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class RegisterDto {
    id: number;
    avatar: string;
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsPhoneNumber('FR')
    phonenumber: string;
    authentication: boolean;
    pendingInvite: boolean;
    status: string;
    twoFactorSecret?: string;
}

export class UpdateDto {
    id: number;
    avatar: string;
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsPhoneNumber('FR')
    phonenumber: string;
    authentication: boolean;
    twoFactorSecret?: string;
}