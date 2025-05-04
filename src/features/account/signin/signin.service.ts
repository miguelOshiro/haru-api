import { Injectable, UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@nestjs/common';
import { SignInRequestDto } from './signin.dto';
import { JwtTokenService } from '../../../shared/services/jwt/jwt.service';
import { AuthResponseDto } from '../../../shared/dto/auth-response.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SignInService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,
    private readonly jwt: JwtTokenService) {}

  async signIn(dto: SignInRequestDto): Promise<AuthResponseDto> {

    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if(!user) {
      throw new UnauthorizedException(`Credentials are not valid`);
    }

    if(!bcrypt.compareSync(dto.password, user.password)) {
      throw new UnauthorizedException(`Credentials are not valid`);
    }

    const accessToken =  await this.jwt.generateAccessToken(user);
    const refreshToken = await this.jwt.generateRefreshToken(user);

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
