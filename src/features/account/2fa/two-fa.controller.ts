import { Controller, Get, Query, UseGuards, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TwoFaService } from './two-fa.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@ApiTags('account')
@ApiBearerAuth()
@Controller({ path: 'account/2fa', version: '1' })
@UseGuards(JwtAuthGuard)
export class TwoFaController {
  constructor(private readonly twoFAService: TwoFaService) {}

  @Version('1')
  @Get()
  @ApiOperation({
    summary: 'Generate 2FA Secret and QR Code',
    description:
      'Generates a new Two-Factor Authentication (2FA) secret and corresponding QR code. The user should scan this QR code using an authenticator app (e.g., Google Authenticator).',
  })
  @ApiResponse({
    status: 200,
    description: '2FA secret and QR code generated successfully.',
    schema: {
      example: {
        secret: 'KVPDQNCTEFQSIJJUOQSFAMBTMIXU64ZVGBCVOODDPNAXQYTHN5XQ',
        qrCode: 'data:image/png;base64,iVBORw0K...',
      },
    },
  })
  async generate() {
    const { secret, otpUrl } = await this.twoFAService.generateSecret();
    const qrCode = await this.twoFAService.generateQrCode(otpUrl);

    return {
      secret,
      qrCode,
    };
  }
}

// @ApiQuery({
//   name: 'email',
//   required: true,
//   description: 'Email address of the user for whom the 2FA setup is being initialized.',
//   example: 'user@example.com',
// })