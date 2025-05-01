import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';

@Module({
  imports: [
    NestJwtModule.register({
      secret: process.env.JWT_SECRET ?? 'dev_secret',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN ?? '1h' },
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})

export class JwtTokenModule {}