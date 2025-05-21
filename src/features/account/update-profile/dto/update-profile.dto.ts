import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, MaxLength, MinLength } from "class-validator";


export class UpdateProfileDto {

    @ApiProperty({ example: 'Pedro' })
    @Expose()
    @IsString()
    @MinLength(2)
    firstname: string;

    @ApiProperty({ example: 'Perezs' })
    @Expose()
    @IsString()
    @MinLength(2)
    lastname: string;

    @ApiProperty({ example: '987654322' })
    @MinLength(9)
    @MaxLength(9)
    @Expose()
    @IsString()
    phoneNumber: string;

}
