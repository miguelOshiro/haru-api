import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";


// forgot-password.dto.ts
export class ForgotPasswordDto {
    @ApiProperty({ example: '0shiromiguel@gmail.com' })
    @IsEmail()
    email: string;
}
  
