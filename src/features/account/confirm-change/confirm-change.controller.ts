import { Controller, Post, Body } from '@nestjs/common';
import { ConfirmChangeService } from './confirm-change.service';
import { ConfirmChangeDto } from './dto/confirm-change.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@Controller({ path: 'account/confirm-change', version: '1'})
export class ConfirmChangeController {
  constructor(private readonly confirmChangeService: ConfirmChangeService) {}

  @Post()
  create(@Body() confirmChangeDto: ConfirmChangeDto) {
    return this.confirmChangeService.confirmChange(confirmChangeDto);
  }


}
