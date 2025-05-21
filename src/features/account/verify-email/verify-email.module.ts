import { Module } from '@nestjs/common';
import { VerifyEmailService } from './verify-email.service';
import { VerifyEmailController } from './verify-email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, Permission, RolePermission, PermissionType, User, RefreshToken } from '../../../entities';
import { HttpModule } from '@nestjs/axios';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { EmailService } from '../../../shared/services/email/brevo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType, RefreshToken ]),
    HttpModule,
    JwtTokenModule
  ],
  controllers: [VerifyEmailController],
  providers: [VerifyEmailService, StorageService, EmailService],
})
export class VerifyEmailModule {}
