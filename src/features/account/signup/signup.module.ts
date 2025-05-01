import { Module } from '@nestjs/common';
import { SignUpController } from './signup.controller';
import { SignUpService } from './signup.service';
import { JwtTokenModule } from '../../../shared/services/jwt/jwt.module';

@Module({
  imports: [JwtTokenModule],
  controllers: [SignUpController],
  providers: [SignUpService],
})

export class SignUpModule {}