import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordController } from './forgot-password.controller';
import { Role, Permission, RolePermission, PermissionType, User, RefreshToken } from '../../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { HttpModule } from '@nestjs/axios';
import { EmailService } from 'src/shared/services/email/brevo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType, RefreshToken ]),
    JwtTokenModule,
    HttpModule
  ],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService, EmailService, StorageService],
})
export class ForgotPasswordModule {}
