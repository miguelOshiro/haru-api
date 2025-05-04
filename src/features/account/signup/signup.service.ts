import { Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './signup.dto';
import { AuthResponseDto } from '../../../shared/dto/auth-response.dto';
import { JwtTokenService } from '../../../shared/services/jwt/jwt.service';
import { v4 as uuidv4 } from 'uuid';
import { emailMapper, signUpMapper } from './signup.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { BrevoService } from 'src/shared/services/email/brevo.service';
import { DestinationEmail, DestinationParams, EmailDto } from '../../../shared/dto/email.dto';
import { StorageService } from 'src/shared/services/storage/storage.service';

@Injectable()
export class SignUpService {
  constructor(
    private readonly jwt: JwtTokenService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role> ,
    private readonly brevoService: BrevoService,
    private readonly storageService: StorageService
    ) {}
  
  async signUp(dto: SignUpRequestDto): Promise<AuthResponseDto> {

    const exist = await this.userRepository.findOne({where: [
      { email: dto.email },
      { phoneNumber: dto.phoneNumber },
    ]
    });

    if (exist) {
      throw new Error('Success');
    }

    const entity = signUpMapper(dto);
    
    const user = await this.userRepository.save(entity);

    const htmlContent = await this.storageService.getFile('public', 'templates_welcome.html');

    const email = emailMapper(user, 'Welcome', htmlContent);
    
    this.brevoService.sendTransactionalEmail(email);

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