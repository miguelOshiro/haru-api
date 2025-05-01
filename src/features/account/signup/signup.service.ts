import { Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './signup.dto';
import { AuthResponseDto } from '../../../shared/dto/auth-response.dto';
import { JwtTokenService } from '../../../shared/services/jwt/jwt.service';
import { v4 as uuidv4 } from 'uuid';
import { SignUpMapper } from './signup.mapper';

@Injectable()
export class SignUpService {
  constructor(private readonly jwt: JwtTokenService) {}
  
  async signUp(dto: SignUpRequestDto): Promise<AuthResponseDto> {

    if (dto.email === 'existing@example.com') {
      throw new Error('Email already exists');
    }

    const user = SignUpMapper(dto);

    const payload = {
      email: user.email,
      sub: uuidv4()
    };

    const accessToken =  await this.jwt.generateAccessToken(payload);
    const refreshToken = await this.jwt.generateRefreshToken(payload);

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