import { Module } from '@nestjs/common';
import { SignUpController } from './signup.controller';
import { SignUpService } from './signup.service';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';
import { Role, Permission, RolePermission, PermissionType, User } from '../../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { BrevoService } from '../../../shared/services/email/brevo.service';
import { StorageService } from 'src/shared/services/storage/storage.service';

@Module({
  imports: [
    JwtTokenModule,
    HttpModule,
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType ]),
  ],
  controllers: [SignUpController],
  providers: [SignUpService, BrevoService, StorageService],
  exports: [TypeOrmModule]
})

export class SignUpModule {}