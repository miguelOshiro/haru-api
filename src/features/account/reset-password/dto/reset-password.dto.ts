import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class ResetPasswordDto {

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjBzaGlyb21pZ3VlbEBnbWFpbC5jb20iLCJwaG9uZSI6Ijk4NzY1NDMyMSIsInN1YiI6ImE2Mjg4MGU1LTlmOWItNGIxOS1iNTYwLWMzYjQ3MjhkNDZmNyIsImlhdCI6MTc0NjgyNDQwOCwiZXhwIjoxNzQ2ODI4MDA4fQ.8EqEGq60NIscrV1Pd9FB9T2K298LfxrQTKzjv3Fq5Ro' })
    @IsString()
    token: string;

    @ApiProperty({ example: 'User2025$$' })
    @MinLength(3)
    password: string;
}
