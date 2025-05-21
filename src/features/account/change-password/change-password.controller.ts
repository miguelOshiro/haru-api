import { Controller, Body, Param, Put, UseGuards, Version } from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';
import { UpdateChangePasswordDto } from './dto/update-change-password.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@ApiTags('account')
@ApiBearerAuth()
@Controller({ path: 'account/change-password', version: '1' })
@UseGuards(JwtAuthGuard)
export class ChangePasswordController {

  constructor(private readonly changePasswordService: ChangePasswordService) {}


  @Version('1')
  @Put()
  update(@Body() updateChangePasswordDto: UpdateChangePasswordDto) {
    return this.changePasswordService.update( updateChangePasswordDto);
  }


}
