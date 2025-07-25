import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class TwoFaVerifyDto {
  @ApiProperty({
    example: 'JBSWY3DPEHPK3PXP',
    description: 'Base32-encoded 2FA secret shared with the authenticator app',
  })
  @IsString()
  secret: string;

  @ApiProperty({
    example: '123456',
    description: '6-digit code generated by the authenticator app',
  })
  @IsString()
  @Length(6, 6, { message: 'The 2FA code must be exactly 6 digits' })
  code: string;
}