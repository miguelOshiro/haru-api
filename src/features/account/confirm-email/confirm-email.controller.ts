import { Controller, Post, Body, UseGuards, Version } from '@nestjs/common';
import { ConfirmEmailService } from './confirm-email.service';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@ApiTags('account')
@ApiBearerAuth()
@Controller({ path:'account/confirm-email', version: '1' })
@UseGuards(JwtAuthGuard)
export class ConfirmEmailController {
  constructor(private readonly confirmEmailService: ConfirmEmailService) {}

  @Version('1')
  @Post()
  create() {
    return this.confirmEmailService.confirmEmail();
  }


}
