import { Controller, Post, Body, Version } from '@nestjs/common';
import { SignUpService } from './signup.service';
import { SignUpRequestDto } from './signup.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from '../../../shared/dto/auth-response.dto';

@ApiTags('account')
@Controller({ path: 'account/signup', version: '1' })
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Version('1')
  @Post()
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user account with the provided email and password. Returns an authentication token upon successful registration.',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation or other error',
    schema: {
      example: {
        isSuccess: false,
        message: 'Bad Request Exception',
        exception: {
          name: 'BadRequestException',
          message: 'Invalid input data',
        },
      },
    },
  })
  async signup(@Body() dto: SignUpRequestDto): Promise<AuthResponseDto> {
    return this.signUpService.signUp(dto);
  }
}