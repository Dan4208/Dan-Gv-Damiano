import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule], // ✅ Use UsersService
  controllers: [AdminController],
})
export class AdminModule {}
