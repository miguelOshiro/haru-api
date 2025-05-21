import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, Permission, RolePermission, PermissionType, User, RefreshToken } from '../../../entities';
import { HttpModule } from '@nestjs/axios';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType, RefreshToken ]),
    HttpModule,
    JwtTokenModule
  ],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule {}
