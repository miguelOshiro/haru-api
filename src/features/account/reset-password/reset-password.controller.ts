import { Controller, Get, Post, Body, Patch, Param, Delete, Version } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@Controller({ path: 'account/reset-password', version: '1' })
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Version('1')
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.resetPasswordService.resetPassword(dto.token, dto.password);
  }


}
