import { Module } from '@nestjs/common';
import { ConfirmEmailService } from './confirm-email.service';
import { ConfirmEmailController } from './confirm-email.controller';
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
  controllers: [ConfirmEmailController],
  providers: [ConfirmEmailService, EmailService, StorageService],
})
export class ConfirmEmailModule {}
