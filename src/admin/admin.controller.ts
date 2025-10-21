import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt')) // ✅ Protect route
  @Get('users')
  findAllUsers() {
    return this.usersService.findAll();
  }
}
