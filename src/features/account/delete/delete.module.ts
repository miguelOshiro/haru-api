import { Module } from '@nestjs/common';
import { DeleteService } from './delete.service';
import { DeleteController } from './delete.controller';
import { Role, Permission, RolePermission, PermissionType, User, RefreshToken } from '../../../entities';
import { HttpModule } from '@nestjs/axios';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from 'src/shared/services/storage/storage.service';
import { EmailService } from 'src/shared/services/email/brevo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType, RefreshToken ]),
    HttpModule,
    JwtTokenModule
  ],
  controllers: [DeleteController],
  providers: [DeleteService, StorageService, EmailService],
})
export class DeleteModule {}
