import { Controller, Post, Body, Version } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@Controller({ path: 'account/forgot-password', version: '1' })
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Version('1')
  @Post('forgot-password')
  create(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.forgotPasswordService.forgotPassword(forgotPasswordDto);
  }



}
