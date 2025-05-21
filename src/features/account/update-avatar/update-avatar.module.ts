import { Module } from '@nestjs/common';
import { UpdateAvatarService } from './update-avatar.service';
import { UpdateAvatarController } from './update-avatar.controller';
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
  controllers: [UpdateAvatarController],
  providers: [UpdateAvatarService],
})
export class UpdateAvatarModule {}
