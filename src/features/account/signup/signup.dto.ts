import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({ example: 'newuser@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @Expose()
  @IsString()
  @MinLength(9)
  @MaxLength(9)
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
  avatar: string;

  @Expose()
  @IsString()
  @MinLength(36)
  @MaxLength(36)
  roleId: string;


}