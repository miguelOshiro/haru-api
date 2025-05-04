import { Module } from '@nestjs/common';
import { SignInController } from './signin.controller';
import { SignInService } from './signin.service';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, Permission, RolePermission, PermissionType, User } from '../../../entities';

@Module({
  imports: [
    JwtTokenModule,
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType ]),
  ],
  controllers: [SignInController],
  providers: [SignInService],
  exports: [TypeOrmModule]
})

export class SignInModule {}

