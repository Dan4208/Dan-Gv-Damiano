import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    return this.usersService.create({ email, password });
  }

  async login(email: string, password: string) {
    const user = await this.usersService.validateUser(email, password);
    if (!user) return { message: 'Invalid credentials' };

    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
