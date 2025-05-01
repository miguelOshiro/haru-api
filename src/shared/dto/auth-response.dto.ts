import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'Bearer' })
  tokenType: string;

  @ApiProperty({ example: 'access-token' })
  accessToken: string;

  @ApiProperty({ example: '2025-04-29T22:00:00.000Z', type: String })
  accessExpiresAt: Date;

  @ApiProperty({ example: 'refresh-token' })
  refreshToken: string;

  @ApiProperty({ example: '2025-04-29T22:00:00.000Z', type: String })
  refreshExpiresAt: Date;
}