import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateChangePasswordDto {

    @ApiProperty({ example: 'User2025$$$' })
    @IsString()
    oldPassword: string;

    @ApiProperty({ example: 'NewUser2025$$$' })
    @IsString()
    newPassword: string;
}
