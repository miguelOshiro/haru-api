import { Module } from '@nestjs/common';
import { SignoutService } from './signout.service';
import { SignoutController } from './signout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';
import { Role, Permission, RolePermission, PermissionType, User, RefreshToken } from '../../../entities';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType, RefreshToken ]),
    HttpModule,
    JwtTokenModule
  ],
  controllers: [SignoutController],
  providers: [SignoutService],
})
export class SignoutModule {}
