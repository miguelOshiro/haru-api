import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as speakeasy from 'speakeasy';
import { User } from 'src/entities';
import { JwtTokenService } from 'src/shared/services/jwt/jwt.service';
import { Repository } from 'typeorm';

@Injectable()
export class TwoFaVerifyService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,
    private readonly jwt: JwtTokenService,) {}

  async verifyToken(secret: string, token: string): Promise<boolean> {

    const payload = await this.jwt.verifyToken(token);
    console.log('payloaddd',payload);

    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });
    
    if (!user || !user.haveTwoFactor) throw new UnauthorizedException(`User not eligible for 2FA`);

    return  speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
    }) as boolean;
  }
}
