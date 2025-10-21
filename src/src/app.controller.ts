import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome(): string {
    return '🚀 NestJS API is running on http://localhost:3000';
  }
}
