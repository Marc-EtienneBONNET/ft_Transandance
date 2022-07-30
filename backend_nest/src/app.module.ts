import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ft-transcendence.ctvxdqqpfzzy.us-east-1.rds.amazonaws.com',
      port: 5432,
      username: 'mdaillet',
      password: 'mdaillet',
      database: 'transcendence',
      entities: [User],
    })
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}

m
