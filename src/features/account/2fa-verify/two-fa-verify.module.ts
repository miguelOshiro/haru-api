import { Module } from '@nestjs/common';
import { TwoFaVerifyService } from './two-fa-verify.service';
import { TwoFaVerifyController } from './two-fa-verify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';
import { HttpModule } from '@nestjs/axios';
import { Role, Permission, RolePermission, PermissionType, User, RefreshToken } from '../../../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType, RefreshToken ]),
    HttpModule,
    JwtTokenModule
  ],
  controllers: [TwoFaVerifyController],
  providers: [TwoFaVerifyService],
})
export class TwoFaVerifyModule {}
