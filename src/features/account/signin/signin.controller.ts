import { Body, Controller, Post, Version } from '@nestjs/common';
import { SignInService } from './signin.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInRequestDto } from './signin.dto';
import { AuthResponseDto } from '../../../shared/dto/auth-response.dto';

@ApiTags('account')
@Controller({ path: 'account/signin', version: '1' })
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Version('1')
  @Post()
  @ApiOperation({ 
    summary: 'Authenticate user credentials', 
    description: 'Validates user credentials (email and password) and returns a JWT access token and refresh token if authentication is successful.' })
  @ApiBody({ type: SignInRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Successful authentication',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    schema: {
      example: {
        isSuccess: false,
        message: 'Invalid credentials',
        exception: {
          name: 'UnauthorizedException',
          message: 'Unauthorized',
        },
      },
    },
  })
  async SignIn(@Body() dto: SignInRequestDto) {
    return this.signInService.signIn(dto);
  }
}