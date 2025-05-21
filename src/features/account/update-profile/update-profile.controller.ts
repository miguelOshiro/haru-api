import { Controller, Body, Param, Put, UseGuards, Version } from '@nestjs/common';
import { UpdateProfileService } from './update-profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@ApiTags('account')
@ApiBearerAuth()
@Controller({ path: 'account/update-profile', version: '1' })
@UseGuards(JwtAuthGuard)
export class UpdateProfileController {
  constructor(private readonly updateProfileService: UpdateProfileService) {}

  @Version('1')
  @Put()
  update( @Body() updateProfileDto: UpdateProfileDto) {
    return this.updateProfileService.update(updateProfileDto);
  }

}
