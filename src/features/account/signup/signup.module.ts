import { Module } from '@nestjs/common';
import { SignUpController } from './signup.controller';
import { SignUpService } from './signup.service';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';
import { Role, Permission, RolePermission, PermissionType, User } from '../../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtTokenModule,
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType ]),
  ],
  controllers: [SignUpController],
  providers: [SignUpService],
  exports: [TypeOrmModule]
})

export class SignUpModule {}