import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClsService } from 'nestjs-cls';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly cls: ClsService,
    private readonly configService: ConfigService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment');
    }

    console.log('🟢 JwtStrategy initialized with secret:', jwtSecret);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { email: string; sub: string }) {
    console.log('✅ Test !!!! JwtStrategy: payload received', payload);
    this.cls.set('user', payload);
    return Promise.resolve({
      email: payload.email,
      userId: payload.sub,
    });
  }
}