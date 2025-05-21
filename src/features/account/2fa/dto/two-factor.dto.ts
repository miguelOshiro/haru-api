import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class TwoFactorDto {

    @ApiProperty({ example: '0shiromiguel@gmail.com' })
    @IsString()
    @IsEmail()
    email: string;
}
