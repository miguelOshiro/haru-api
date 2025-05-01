import { Module } from '@nestjs/common';
import { SignUpController } from './signup.controller';
import { SignUpService } from './signup.service';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';
import { Role } from '../../../entities/role.entity';
import { User } from '../../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from 'src/entities/role-permission.entity';

@Module({
  imports: [
    JwtTokenModule,
    TypeOrmModule.forFeature([ User, Role, RolePermission ]),
  ],
  controllers: [SignUpController],
  providers: [SignUpService],
  exports: [TypeOrmModule]
})

export class SignUpModule {}