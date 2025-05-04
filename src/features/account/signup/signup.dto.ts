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
} from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({ example: 'newuser@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @Expose()
  @ApiProperty({
      name: 'firstName',
      type: String,
      description: 'Nombre del usuario',
      required: true
  })
  @IsString()
  @MinLength(2)
  firstname: string;

  @Expose()
  @ApiProperty({
      name: 'lastName',
      type: String,
      description: 'Apellido del usuario',
      required: true
  })
  @IsString()
  @MinLength(2)
  lastname: string;

  @Expose()
  @IsString()
  @IsOptional()
  avatar?: string;


}