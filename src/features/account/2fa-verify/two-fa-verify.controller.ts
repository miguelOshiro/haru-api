import { Controller, Post, Body } from '@nestjs/common';
import { TwoFaVerifyService } from './two-fa-verify.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { TwoFaVerifyDto } from './two-fa-verify.dto';

@ApiTags('account')
@Controller({ path: 'account/2fa', version: '1' })
export class TwoFaVerifyController {
  constructor(private readonly twoFaVerifyService: TwoFaVerifyService) {}

  @Post()
  @ApiOperation({
    summary: 'Verify 2FA Code',
    description: 'Verifies a Time-based One-Time Password (TOTP) code provided by the user using the previously generated secret.',
  })
  @ApiBody({
    type: TwoFaVerifyDto,
    description: 'Object containing the 2FA secret and the TOTP code to be verified.',
    examples: {
      valid: {
        summary: 'Valid request',
        value: {
          secret: 'KVPDQNCTEFQSIJJUOQSFAMBTMIXU64ZVGBCVOODDPNAXQYTHN5XQ',
          code: '123456',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Returns true if the code is valid, false otherwise.',
    schema: {
      example: true,
    },
  })
  async verifyCode(@Body() dto: TwoFaVerifyDto): Promise<boolean> {
    return await this.twoFaVerifyService.verifyToken(dto.secret, dto.code);
  }
}