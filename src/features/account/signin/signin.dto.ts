import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({ example: '0shiromiguel@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'User2025$$$' })
  @IsString()
  password: string;
}