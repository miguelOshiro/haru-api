import { Controller, Get, Post, Body, Patch, Param, Delete, Version, UseGuards } from '@nestjs/common';
import { ChangeEmailService } from './change-email.service';
import { ChangeEmailDto } from './dto/change-email.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@ApiTags('account')
@ApiBearerAuth()
@Controller({ path: 'account/change-email', version: '1' })
@UseGuards(JwtAuthGuard)
export class ChangeEmailController {
  constructor(private readonly changeEmailService: ChangeEmailService) {}

  @Version('1')
  @Post()
  create(@Body() changeEmailDto: ChangeEmailDto) {
    return this.changeEmailService.changeEmail(changeEmailDto);
  }


}
