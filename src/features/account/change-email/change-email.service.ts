import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ChangeEmailDto } from './dto/change-email.dto';
import { User } from '../../../entities';
import { Repository } from 'typeorm';
import { ClsService } from 'nestjs-cls';
import { JwtTokenService } from '../../../shared/services/jwt/jwt.service';
import { EmailService } from '../../../shared/services/email/brevo.service';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailDto } from '../../../shared/dto/email.dto';

@Injectable()
export class ChangeEmailService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,
    private readonly cls: ClsService,
    private readonly jwt: JwtTokenService,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,) {}

  async changeEmail(changeEmailDto: ChangeEmailDto) {

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

    const { token } = await this.jwt.generateChangeEmailToken(user, changeEmailDto.newEmail);

    const confirmLink = `${process.env.URL_FROMEND}/confirm-change?token=${token}`;

    const rawHtmlTemplate = await this.storageService.getFile('public', 'templates_change_email.html');

    const renderedHtml = rawHtmlTemplate
          .replace('{{param.firstName}}', user.firstname)
          .replace('{{param.newEmail}}', changeEmailDto.newEmail);

    const emailDto: EmailDto = {
      subject: 'Confirmar Cambio de Email',
      sender: { name: process.env.EMAIL_NAME!, email: process.env.EMAIL_SENDER! },
      replyTo: { name: 'pp', email: 'joshirog@gmail.com' },
      to: [{ name: user.firstname || 'Usuario', email: user.email }],
      htmlContent: renderedHtml,
      params: {
        firstName: user.firstname,
        link: '',
        dateBlock: null,
        url: confirmLink,
        newEmail: changeEmailDto.newEmail
      },
    };
  
    await this.emailService.sendTransactionalEmail(emailDto);
    return 'This action adds a new confirmEmail fffff';
  }

}
