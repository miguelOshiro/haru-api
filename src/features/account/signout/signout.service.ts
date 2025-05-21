import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignoutDto } from './dto/signout.dto';
import { Repository } from 'typeorm';
import { JwtTokenService } from 'src/shared/services/jwt/jwt.service';
import { ClsService } from 'nestjs-cls';
import { RefreshToken } from '../../../entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SignoutService {

  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken> ,
    private readonly cls: ClsService,
    private readonly jwt: JwtTokenService,) {}

  async signout() {

    const userFromContext = this.cls.get('user'); 

    if (!userFromContext) {
      throw new UnauthorizedException('Credentialssss are not valid');
    }

    const tokenEntity = await this.refreshTokenRepository.findOne({
      where: { token: userFromContext.sub },
      relations: ['user'],
    });

    console.log('tokenEntityyy', tokenEntity);
  
    if (!tokenEntity || tokenEntity.revoked) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  
    tokenEntity.revoked = true;
    await this.refreshTokenRepository.save(tokenEntity);

    return 'This action adds a new signouttttttt';
  }


}
