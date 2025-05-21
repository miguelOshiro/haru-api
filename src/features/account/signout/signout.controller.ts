import { Controller, Post, Body, Version, UseGuards } from '@nestjs/common';
import { SignoutService } from './signout.service';
import { SignoutDto } from './dto/signout.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@ApiTags('account')
@ApiBearerAuth()
@Controller({ path: 'account/signout', version: '1'})
@UseGuards(JwtAuthGuard)
export class SignoutController {
  constructor(private readonly signoutService: SignoutService) {}

  @Version('1')
  @Post()
  create() {
    return this.signoutService.signout();
  }

//@Body() signoutDto: SignoutDto
}
