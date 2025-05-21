import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { User } from 'src/entities';
import { EmailService } from '../../../shared/services/email/brevo.service';
import { ClsService } from 'nestjs-cls';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtTokenService } from 'src/shared/services/jwt/jwt.service';
import { EmailDto } from 'src/shared/dto/email.dto';

@Injectable()
export class ConfirmEmailService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,
    private readonly cls: ClsService,
    private readonly jwt: JwtTokenService,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,) {}

  async confirmEmail() {

    const userFromContext = this.cls.get('user'); 

    if (!userFromContext) {
      throw new UnauthorizedException('Credentialssss are not valid');
    }
    
    const user = await this.userRepository.findOne({
      where: { id: userFromContext.id },
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    if (!user.haveConfirmEmail) {
      throw new UnauthorizedException('Credentials are not validddd');
    }

    if(user.haveConfirmEmail) {

      const { token } = await this.jwt.generateAccessToken(user);
  
      const verifyLink = `${process.env.URL_FROMEND}/verify-email?token=${token}`;
  
      const rawHtmlTemplate = await this.storageService.getFile('public', 'templates_confirm_email.html');
  
      const emailDto: EmailDto = {
        subject: 'Confirmar cuenta',
        sender: { name: process.env.EMAIL_NAME!, email: process.env.EMAIL_SENDER! },
        replyTo: { name: 'pp', email: 'joshirog@gmail.com' },
        to: [{ name: user.firstname || 'Usuario', email: user.email }],
        htmlContent: rawHtmlTemplate,
        params: {
          firstName: user.firstname,
          link: '',
          dateBlock: null,
          url: verifyLink,
          newEmail: ''
        },
      };
  
      await this.emailService.sendTransactionalEmail(emailDto);
      return 'This action adds a new confirmEmailll';


    } else {
      throw new UnauthorizedException('Credentialssss areee not valid');
    }

  }

}
