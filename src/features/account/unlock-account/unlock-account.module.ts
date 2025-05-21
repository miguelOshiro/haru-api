import { Module } from '@nestjs/common';
import { UnlockAccountService } from './unlock-account.service';
import { UnlockAccountController } from './unlock-account.controller';
import { Role, Permission, RolePermission, PermissionType, User, RefreshToken } from '../../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType, RefreshToken ]),
  ],
  controllers: [UnlockAccountController],
  providers: [UnlockAccountService],
  exports: [TypeOrmModule]
})
export class UnlockAccountModule {}
