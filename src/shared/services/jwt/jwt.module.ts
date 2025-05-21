import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';
import { Role, Permission, RolePermission, PermissionType, User, RefreshToken } from '../../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType, RefreshToken ]),
    NestJwtModule.register({
      secret: process.env.JWT_SECRET ?? 'dev_secret',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN ?? '1h' },
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})

export class JwtTokenModule {}