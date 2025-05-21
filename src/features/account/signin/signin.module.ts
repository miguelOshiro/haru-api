import { Module } from '@nestjs/common';
import { SignInController } from './signin.controller';
import { SignInService } from './signin.service';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, Permission, RolePermission, PermissionType, User, RefreshToken } from '../../../entities';
import { HttpModule } from '@nestjs/axios';
import { EmailService } from 'src/shared/services/email/brevo.service';
import { StorageService } from 'src/shared/services/storage/storage.service';

@Module({
  imports: [
    JwtTokenModule,
    HttpModule,
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType, RefreshToken ]),
  ],
  controllers: [SignInController],
  providers: [SignInService, EmailService, StorageService],
  exports: [TypeOrmModule]
})

export class SignInModule {}

