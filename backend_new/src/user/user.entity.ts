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
    phoneNumber: string;
    @Column()
    status: string;
    @Column()
    twofa: boolean;
    @Column()
    twoFactorSecret: string;
    @Column()
    pendingInvite: boolean;
    @ManyToMany(() => User)
    @JoinTable()
    friends: User[];
}