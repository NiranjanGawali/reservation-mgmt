import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsEmail()
  _id: string;
}
