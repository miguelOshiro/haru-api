import { Controller, Body, Put, UseGuards, Version } from '@nestjs/common';
import { UpdateAvatarService } from './update-avatar.service';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@ApiTags('account')
@ApiBearerAuth()
@Controller({ path: 'account/update-avatar', version: '1' })
@UseGuards(JwtAuthGuard)
export class UpdateAvatarController {
  constructor(private readonly updateAvatarService: UpdateAvatarService) {}

  @Version('1')
  @Put()
  update( @Body() updateAvatarDto: UpdateAvatarDto) {
    return this.updateAvatarService.update(updateAvatarDto);
  }

}
