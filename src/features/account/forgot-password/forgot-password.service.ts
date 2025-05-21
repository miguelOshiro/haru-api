import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { JwtTokenService } from 'src/shared/services/jwt/jwt.service';
import { Repository } from 'typeorm';
import { User } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { EmailDto } from 'src/shared/dto/email.dto';
import { EmailService } from '../../../shared/services/email/brevo.service';

@Injectable()
export class ForgotPasswordService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,
    private readonly jwt: JwtTokenService,
    private readonly storageService: StorageService,
    private readonly emailService: EmailService) {}

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {

    const user = await this.userRepository.findOne({
      where: { email: forgotPasswordDto.email },
    });
  
    if(!user) {
      throw new UnauthorizedException(`Success`);
    }

    const { token } = await this.jwt.generateAccessToken(user);

    const resetLink = `${process.env.URL_FROMEND}/forgot-password?token=${token}`;

    // Obtener y renderizar el HTML desde Firebase Storage
    const rawHtmlTemplate = await this.storageService.getFile('public', 'templates_forgot_password.html');

    const emailDto: EmailDto = {
      subject: 'Restablecimiento de contraseña',
      sender: { name: process.env.EMAIL_NAME!, email: process.env.EMAIL_SENDER! },
      replyTo: { name: 'pp', email: 'joshirog@gmail.com' },
      to: [{ name: user.firstname || 'Usuario', email: user.email }],
      htmlContent: rawHtmlTemplate,
      params: {
        firstName: user.firstname,
        link: '',
        dateBlock: null,
        url: resetLink,
        newEmail: ''
      },
    };

    await this.emailService.sendTransactionalEmail(emailDto);

    return { message: 'Correo enviado con instrucciones para restablecer la contraseña.' };
  }

}
