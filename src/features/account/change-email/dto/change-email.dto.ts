import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class ChangeEmailDto {

    @ApiProperty({ example: 'new0shiromiguel@gmail.com' })
    @IsString()
    @IsEmail()
    newEmail: string;
}
