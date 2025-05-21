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

import { format } from 'date-fns';
import { EmailService } from '../../../shared/services/email/brevo.service';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { EmailDto } from 'src/shared/dto/email.dto';

@Injectable()
export class SignInService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,
    private readonly jwt: JwtTokenService,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService) {}

  async signIn(dto: SignInRequestDto): Promise<AuthResponseDto> {

    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
  
    if(!user) {
      throw new UnauthorizedException(`Credentials are not valid`);
    }

    if(user.status !== 'active') {
      throw new UnauthorizedException(`Credentials are not valid`);
    }

    if (user.haveConfirmEmail) {
      if(!user.confirmEmail)
        throw new UnauthorizedException('User needs to confirmmm their account');
    }

    const passwordIsValid = bcrypt.compareSync(dto.password, user.password);

    if(!passwordIsValid) {
      user.signinFailed += 1;

      if(user.signinFailed > 3) {
        user.status = 'blocked';
        user.dateBlock = new Date();

        // Obtener y renderizar el HTML desde Firebase Storage user.dateBlock.toLocaleDateString());
        const htmlTemplate = await this.storageService.getFile('public', 'templates_block_account.html');

        const renderedHtml = htmlTemplate
          .replace('{{param.firstName}}', user.firstname)
          .replace('{{param.dateBlock}}', 
            user.dateBlock.toLocaleString('es-ES', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
        );

        const emailDto: EmailDto = {
          subject: 'Tu cuenta ha sido bloqueada',
          sender: { name: process.env.EMAIL_NAME!, email: process.env.EMAIL_SENDER! },
          replyTo: { name: 'pp', email: 'joshirog@gmail.com' },
          to: [{ name: user.firstname || 'Usuario', email: user.email }],
          htmlContent: renderedHtml,
          params: {
            firstName: user.firstname,
            link: '',
            dateBlock: user.dateBlock,
            url: '',
            newEmail: ''
          },
        };
        
        await this.emailService.sendTransactionalEmail(emailDto);
      }

      await this.userRepository.save(user);
      throw new UnauthorizedException(`Credentials aaare not valid`);
    } else {
      user.signinFailed = 0;
      await this.userRepository.save(user);
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
