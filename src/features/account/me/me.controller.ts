import { Controller, Get, UseGuards, Version } from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { MeService } from './me.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@ApiBearerAuth()
@Controller({ path: 'account/me', version: '1' })
@UseGuards(JwtAuthGuard)
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Version('1')
  @Get()
  @ApiOperation({ 
    summary: 'Retrieve current user details', 
    description: 'Returns basic information about the currently authenticated user by extracting it from the access token.' })
  @ApiResponse({
    status: 200,
    description: 'Returns the profile of the currently authenticated user.',
    schema: {
      example: {
        isSuccess: true,
        message: 'Success',
        data: {
          email: 'user@example.com',
          userId: 'uuid-value',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - token missing or invalid',
    schema: {
      example: {
        isSuccess: false,
        message: 'Unauthorized',
        exception: {
          name: 'UnauthorizedException',
          message: 'Unauthorized',
        },
      },
    },
  })
  getProfile() {
    return this.meService.getCurrentUser();
  }
}