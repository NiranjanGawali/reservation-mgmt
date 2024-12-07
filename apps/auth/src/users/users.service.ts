import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto, GetUserDto } from './dto';
import { UsersRepository } from './users.repository';
import * as brypt from 'bcryptjs';
import { Role, User } from '@app/core-lib';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    const user = new User({
      ...createUserDto,
      password: await brypt.hash(createUserDto.password, 10),
      roles: createUserDto.roles?.map((roleDto) => new Role(roleDto)),
    });
    return this.userRepository.create(user);
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email: createUserDto.email });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email already exits!');
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const passwordValid = await brypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return await this.userRepository.findOne(getUserDto, { roles: true });
  }
}
