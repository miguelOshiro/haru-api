import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './signup.dto';
import { AuthResponseDto } from '../../../shared/dto/auth-response.dto';
import { JwtTokenService } from '../../../shared/services/jwt/jwt.service';
import * as bcrypt from 'bcrypt';
import { emailMapper, signUpMapper } from './signup.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { EmailService } from 'src/shared/services/email/brevo.service';
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
    private readonly emailService: EmailService,
    private readonly storageService: StorageService
    ) {}
  
  async signUp(dto: SignUpRequestDto): Promise<AuthResponseDto> {

    const exist = await this.userRepository.findOne({where: [
      { email: dto.email },
      { phoneNumber: dto.phoneNumber },
    ]
    });

    if (exist) {
      throw new BadRequestException('A user with this email or phone number already exists.');
    }

    const entity = signUpMapper(dto);

    const hashPassword = dto.password ?? 'User2025$$';
    entity.password = await bcrypt.hash(hashPassword, 10);
    entity.createdBy = process.env.USER_DEFAULT_SYSTEM!;
    
    const htmlContent = await this.storageService.getFile('public', 'templates_welcome.html');
    
    const email = emailMapper(entity, 'Welcome', htmlContent);
    
    this.emailService.sendTransactionalEmail(email);
    
    const user = await this.userRepository.save(entity);

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