import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async all(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: any): Promise<User> {
        const user = this.userRepository.findOne({where: {id: id}});
        return user;
    }

    async findPrivateGame(): Promise<User> {
        return this.userRepository.findOne({where: {pendingInvite: true}});
    }

    async create(data): Promise<User> {
        return this.userRepository.save(data);
    }

    async update(id: number, data): Promise<any> {
        return this.userRepository.update(id, data);
    }

    async setTwoFactorSecret(secret: string, clientID: number): Promise<any> {
        return this.userRepository.update(clientID, { twoFactorSecret: secret });
    }

    async enableTwoFactor(clientID: number): Promise<any> {
        return this.userRepository.update(clientID, { twofa: true})
    }

    async disableTwoFactor(clientID: number): Promise<any> {
        return this.userRepository.update(clientID, { twofa: false})
    }

    async sendGameInvite(clientID: number): Promise<any> {
        return this.userRepository.update(clientID, { pendingInvite: true })
    }

    async acceptGameInvite(clientID: number): Promise<any> {
        return this.userRepository.update(clientID, { pendingInvite: false })
    }

    async setOnline(clientID: number): Promise<any> {
        return this.userRepository.update(clientID, { status: 'ONLINE' })
    }

    async setInGame(clientID: number): Promise<any> {
        return this.userRepository.update(clientID, { status: 'IN GAME' })
    }

    async setOffline(clientID: number): Promise<any> {
        return this.userRepository.update(clientID, { status: 'OFFLINE' })
    }

    async findUserByName(username: any): Promise<User> {
        return this.userRepository.findOne({where: {username: username}})
    }

    async findAllUserFriends(): Promise<User[]> {
        return await this.userRepository.find({ relations: ["friends"] });
    }

    async saveFriendToUser(userID: number, friendID: number): Promise<User[]> {
        const friendToAdd = await this.userRepository.findOne({where: {id: friendID}});
        const userToAdd = await this.userRepository.findOne({where: {id: userID}});
        const allUsers = await this.findAllUserFriends();

        if (userID === friendID) {
            return [];
        }
        else {
            for (const user of allUsers) {
                if (userID === userToAdd.id) {
                    const ifFriend = user.friends.filter((friend) => friend.id === friendToAdd.id);
                    if (!ifFriend.length || !user.friends.length)
                        user.friends.push(friendToAdd);
                }
            }
            return this.userRepository.save(allUsers);
        }
    }

    async deleteFriendFromUser(userID: number, friendID: number): Promise<User[]> {
        const friendToDel = await this.userRepository.findOne({where: {id: friendID}});
        const userToDel = await this.userRepository.findOne({where: {id: userID}});
        const allUsers = await this.findAllUserFriends();

        if (userID === friendID) {
            return [];
        }
        else {
            for (const user of allUsers) {
                if (userID === userToDel.id) {
                    const ifFriend = user.friends.filter((friend) => friend.id === friendToDel.id);
                }
            }
            return this.userRepository.save(allUsers);
        }
    }
}
