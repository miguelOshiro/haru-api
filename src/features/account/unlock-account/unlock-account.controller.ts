import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Version } from '@nestjs/common';
import { UnlockAccountService } from './unlock-account.service';
import { CreateUnlockAccountDto } from './dto/create-unlock-account.dto';
import { UpdateUnlockAccountDto } from './dto/update-unlock-account.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@Controller({ path: 'account/unlock', version: '1' })
export class UnlockAccountController {
  constructor(private readonly unlockAccountService: UnlockAccountService) {}



  @Version('1')
  @Put(':id')
  @ApiOperation({ 
    summary: 'Unlock user account', 
    description: 'method to unlock user account if successful.' })
  update(@Param('id') id: string, ) {
    return this.unlockAccountService.update(id);
  }



}
