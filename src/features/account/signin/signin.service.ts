import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@nestjs/common';
import { SignInRequestDto } from './signin.dto';
import { JwtTokenService } from '../../../shared/services/jwt/jwt.service';
import { AuthResponseDto } from '../../../shared/dto/auth-response.dto';

@Injectable()
export class SignInService {
  constructor(private readonly jwt: JwtTokenService) {}
  async signIn(dto: SignInRequestDto): Promise<AuthResponseDto> {
    console.log('Email:', dto.email);

    const payload = {
      email: dto.email,
      sub: uuidv4()
    };
    
    const accessToken =  await this.jwt.generateAccessToken(payload);
    const refreshToken = await this.jwt.generateRefreshToken(payload);

    const logger = new Logger('SignInService');
    logger.log(accessToken);
    //logger.error('Error occurred example log error');
    
    const response: AuthResponseDto = {
      tokenType: 'Bearer',
      accessToken: accessToken.token,
      accessExpiresAt: accessToken.expiresAt,
      refreshToken: refreshToken.token,
      refreshExpiresAt: refreshToken.expiresAt,
    };
    
    return Promise.resolve(response);
  }
}
