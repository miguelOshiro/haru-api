import { Controller, Body, Param, Delete, UseGuards, Version } from '@nestjs/common';
import { DeleteService } from './delete.service';
import { DeleteDto } from './dto/delete.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@ApiTags('account')
@ApiBearerAuth()
@Controller({ path: 'account/delete', version: '1' })
@UseGuards(JwtAuthGuard)
export class DeleteController {
  constructor(private readonly deleteService: DeleteService) {}

  @Version('1')
  @Delete()
  remove() {
    return this.deleteService.remove();
  }




}
