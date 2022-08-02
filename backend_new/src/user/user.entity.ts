import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryColumn({ unique: true })
    id: number;
    @Column()
    avatar: string;
    @Column({ unique: true })
    username: string;
    @Column( { unique: true })
    email: string;
    @Column({ unique: true })
    phonenumber: string;
    @Column()
    pendingInvite: boolean;
    @Column()
    status: string;
    @ManyToMany(() => User)
    @JoinTable()
    friends: User[];
    @Column()
    twoFactorSecret: string;
    @Column()
    authentication: boolean;
}