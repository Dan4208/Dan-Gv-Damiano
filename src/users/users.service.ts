import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Return all users
  findAll() {
    return this.usersRepository.find();
  }

  // Find user by email
  findOneByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Create a new user with hashed password
  async create(data: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.usersRepository.create({
      email: data.email,
      password: hashedPassword,
      isAdmin: false, // default
    });
    return this.usersRepository.save(user);
  }

  // Validate user credentials
  async validateUser(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return user;
  }
}
