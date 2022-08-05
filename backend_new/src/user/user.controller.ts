import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { verifyUser } from './authentication/intra-auth'
import { AuthService } from './authentication/authentication.service';
import { User } from './user.entity';
import { UserService } from './user.service';
import { RegisterModel } from './authentication/models/models';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const storage = { 
    storage: diskStorage({
        destination: './media',
        filename(_, file, cb) {
                return cb(null, `${file.originalname}`)
        }
    })
};

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
    @Get("findUser:username")
    async findUser(@Param('username') username): Promise<User> {
        return await this.userService.findUserByName(username);
    }

    @UseGuards(verifyUser)
    @Post("updateUser")
    async updateUser(@Req() request: Request, @Body() data: RegisterModel) {
        const user = await this.authService.clientID(request);
        await this.userService.update(user, data);
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

    @UseGuards(verifyUser)
    @Post('uploadImage')
    @UseInterceptors(FileInterceptor('avatar', storage))
    uploadFile(@UploadedFile() avatar, @Req() request: Request): Observable<Object> {
        return of({url: `http://localhost:3000/api/user/media/${avatar.filename}`})
    }

    @Get('media/:avatar')
    findAvatar(@Param('avatar') avatar, @Res() res): Observable<Object> {
        return of(res.sendFile(avatar, {root: 'media'}));
    }
}   