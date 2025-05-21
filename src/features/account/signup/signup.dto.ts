import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({ example: '0shiromiguel@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'User2025$$$' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @ApiProperty({ example: '987654321' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @Expose()
  @ApiProperty({
      name: 'firstname',
      type: String,
      description: 'Nombre del usuario',
      required: true
  })
  @IsString()
  @MinLength(2)
  firstname: string;

  @Expose()
  @ApiProperty({
      name: 'lastname',
      type: String,
      description: 'Apellido del usuario',
      required: true
  })
  @IsString()
  @MinLength(2)
  lastname: string;

}