import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';
import { User } from '@app/core-lib';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '@app/core-lib';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User) {
    return user;
  }
}
