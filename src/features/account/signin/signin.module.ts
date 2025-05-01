import { Module } from '@nestjs/common';
import { SignInController } from './signin.controller';
import { SignInService } from './signin.service';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';

@Module({
  imports: [JwtTokenModule],
  controllers: [SignInController],
  providers: [SignInService],
})

export class SignInModule {}

