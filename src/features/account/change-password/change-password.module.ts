import { Module } from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';
import { ChangePasswordController } from './change-password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, Permission, RolePermission, PermissionType, User, RefreshToken } from '../../../entities';
import { HttpModule } from '@nestjs/axios';
import { StorageService } from 'src/shared/services/storage/storage.service';
import { EmailService } from 'src/shared/services/email/brevo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType, RefreshToken ]),
    HttpModule,
  ],
  controllers: [ChangePasswordController],
  providers: [ChangePasswordService, EmailService, StorageService],
})
export class ChangePasswordModule {}
