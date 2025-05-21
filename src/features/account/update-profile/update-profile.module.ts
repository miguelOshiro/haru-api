import { Module } from '@nestjs/common';
import { UpdateProfileService } from './update-profile.service';
import { UpdateProfileController } from './update-profile.controller';
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
  controllers: [UpdateProfileController],
  providers: [UpdateProfileService],
})
export class UpdateProfileModule {}
