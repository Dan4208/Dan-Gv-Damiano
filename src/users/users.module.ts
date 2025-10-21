import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // <-- This registers the repository
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController], // <-- allow other modules (AuthModule) to use UsersService
})
export class UsersModule {}
