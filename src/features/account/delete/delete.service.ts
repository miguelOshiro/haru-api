import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteDto } from './dto/delete.dto';
import { JwtTokenService } from 'src/shared/services/jwt/jwt.service';
import { User } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClsService } from 'nestjs-cls';
import { StorageService } from 'src/shared/services/storage/storage.service';
import { EmailDto } from 'src/shared/dto/email.dto';
import { EmailService } from 'src/shared/services/email/brevo.service';

@Injectable()
export class DeleteService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,
    private readonly jwt: JwtTokenService,
    private readonly cls: ClsService,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,) {}

  async remove() {

    const user = this.cls.get('user');

    if(user.status === 'active') {
      user.status = 'inactive';

      await this.userRepository.save(user);

      // Obtener y renderizar el HTML desde Firebase Storage
      const htmlTemplate = await this.storageService.getFile('public', 'templates_delete_account.html');
      
      const renderedHtml = htmlTemplate
          .replace('{{param.firstName}}', user.firstname);

      const emailDto: EmailDto = {
        subject: 'Tu cuenta ha sido Eliminad(@)',
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

    return 'User has been successfully deleted';
  }


}
