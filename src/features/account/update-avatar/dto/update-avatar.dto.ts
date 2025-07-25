import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class UpdateAvatarDto {

    @ApiProperty({ example: 'string12345.png' })
    @IsString()
    avatar: string;


}
