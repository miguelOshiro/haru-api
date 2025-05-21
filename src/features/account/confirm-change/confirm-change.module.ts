import { Module } from '@nestjs/common';
import { ConfirmChangeService } from './confirm-change.service';
import { ConfirmChangeController } from './confirm-change.controller';
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
  controllers: [ConfirmChangeController],
  providers: [ConfirmChangeService],
})
export class ConfirmChangeModule {}
