import { Controller, Post, Body, Version } from '@nestjs/common';
import { VerifyEmailService } from './verify-email.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@Controller({ path: 'account/verify-email', version: '1' })
export class VerifyEmailController {
  constructor(private readonly verifyEmailService: VerifyEmailService) {}

  @Version('1')
  @Post()
  create(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.verifyEmailService.create(verifyEmailDto);
  }


}
