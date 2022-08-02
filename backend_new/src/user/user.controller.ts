import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { verifyUser } from './authentication/authentication.guard';
import { AuthService } from './authentication/authentication.service';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) {}

    @UseGuards(verifyUser)
    @Get()
    async all(): Promise<User[]> {
        return this.userService.all();
    }

    @UseGuards(verifyUser)
    @Get("findName")
    async findUserName(@Query() query): Promise<User> {
        return await this.userService.findUserName(query);
    }

    @UseGuards(verifyUser)
    @Get("getActiveUserID")
    async getActiveUserID(@Req() request: Request) {
      const id = await this.authService.clientID(request);
        return { activeUserID: id };
    }

    @UseGuards(verifyUser)
    @Get("allUserFriends")
    async getAllUserFriends(): Promise<User[]> {
        return await this.userService.findAllUserFriends();
    }

    // @UseGuards(verifyUser)
    // @Get("userWithFriends")
    // async getUserWithFriends(@Req() request: Request): Promise<User> {
    //     const id = await this.authService.clientID(request);

    //     return await this.userService.findUserWithFriends(id);
    // }

    @UseGuards(verifyUser)
    @Post("saveFriendToUser")
    async saveFriendToUser(@Body() message): Promise<User[]> {
      return await this.userService.saveFriendToUser(message.userID, message.friendID);
    }
  
    @UseGuards(verifyUser)
    @Post("deleteFriendToUser")
    async deleteFriendToUser(@Body() message): Promise<User[]> {
      return await this.userService.deleteFriendFromUser(message.userID, message.friendID);
    }

}   