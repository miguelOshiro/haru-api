import { Module } from '@nestjs/common';
import { ChangeEmailService } from './change-email.service';
import { ChangeEmailController } from './change-email.controller';
import { Role, Permission, RolePermission, PermissionType, User, RefreshToken } from '../../../entities';
import { HttpModule } from '@nestjs/axios';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { EmailService } from '../../../shared/services/email/brevo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType, RefreshToken ]),
    HttpModule,
    JwtTokenModule
  ],
  controllers: [ChangeEmailController],
  providers: [ChangeEmailService, EmailService, StorageService],
})
export class ChangeEmailModule {}
