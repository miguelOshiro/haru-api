import { Module } from '@nestjs/common';
import { TwoFaController } from './two-fa.controller';
import { TwoFaService } from './two-fa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';
import { Role, Permission, RolePermission, PermissionType, User, RefreshToken } from '../../../entities';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { EmailService } from '../../../shared/services/email/brevo.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Role, RolePermission, Permission, PermissionType, RefreshToken ]),
    HttpModule,
    JwtTokenModule
  ],
  controllers: [TwoFaController],
  providers: [TwoFaService,  EmailService, StorageService],
})
export class TwoFaModule {}