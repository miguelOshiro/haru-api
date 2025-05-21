import { Injectable, UnauthorizedException } from '@nestjs/common';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { JwtTokenService } from '../../../shared/services/jwt/jwt.service';
import { User } from '../../../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from '../../../shared/services/email/brevo.service';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { EmailDto } from 'src/shared/dto/email.dto';

@Injectable()
export class VerifyEmailService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,
    private readonly jwt: JwtTokenService,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,) {}

  async create(verifyEmailDto: VerifyEmailDto) {

    const payload = await this.jwt.verifyToken(verifyEmailDto.token);

    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });
    //console.log('USSSERRRRR', user);

    if (!user) throw new UnauthorizedException(`Credentials aaare not valid`);

    if (!user.haveConfirmEmail) {
      throw new UnauthorizedException('Credentials are not validddd');
    }

    if(user.confirmEmail === false) {
      user.confirmEmail = true;
      
      await this.userRepository.save(user);

      const logginLink = `${process.env.URL_FROMEND}/v1/account/signin`;

      const htmlTemplate = await this.storageService.getFile('public', 'templates_verify_email.html');

      const emailDto: EmailDto = {
        subject: 'Cuenta confirmada!',
        sender: { name: process.env.EMAIL_NAME!, email: process.env.EMAIL_SENDER! },
        replyTo: { name: 'pp', email: 'joshirog@gmail.com' },
        to: [{ name: user.firstname || 'Usuario', email: user.email }],
        htmlContent: htmlTemplate,
        params: {
          firstName: user.firstname,
          link: '',
          dateBlock: null,
          url: logginLink,
          newEmail: ''
        },
      };

      await this.emailService.sendTransactionalEmail(emailDto);
    }

    return 'This action adds a new verifyEmail';
  }


}
