import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateChangePasswordDto } from './dto/update-change-password.dto';
import { ClsService } from 'nestjs-cls';
import { EmailService } from 'src/shared/services/email/brevo.service';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageService } from 'src/shared/services/storage/storage.service';
import * as bcrypt from 'bcrypt';
import { EmailDto } from '../../../shared/dto/email.dto';

@Injectable()
export class ChangePasswordService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,
    private readonly cls: ClsService,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,) {}

  async update( updateChangePasswordDto: UpdateChangePasswordDto) {

    const userFromContext = this.cls.get('user'); 

    if (!userFromContext) {
      throw new UnauthorizedException('Credentialssss are not valid');
    }

    const user = await this.userRepository.findOne({
      where: { id: userFromContext.id },
      //select: ['id', 'firstname', 'password'],
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    const isMatch = await bcrypt.compare(updateChangePasswordDto.oldPassword, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Current password not valid');
    }

    const hashedPassword = await bcrypt.hash(updateChangePasswordDto.newPassword, 10);
    user.password = hashedPassword;
    await this.userRepository.save(user);

    const htmlTemplate = await this.storageService.getFile('public', 'templates_change_password.html');

    const renderedHtml = htmlTemplate
        .replace('{{param.firstName}}', user.firstname);

    const emailDto: EmailDto = {
      subject: '¡Contraseña actualizada!',
      sender: { name: process.env.EMAIL_NAME!, email: process.env.EMAIL_SENDER! },
      replyTo: { name: 'pp', email: 'joshirog@gmail.com' },
      to: [{ name: user.firstname || 'Usuario', email: user.email }],
      htmlContent: renderedHtml,
      params: {
        firstName: user.firstname,
        link: '',
        dateBlock: null,
        url: '',
        newEmail: ''
      },
    };
    
    await this.emailService.sendTransactionalEmail(emailDto);

    return 'Password updated successfully';
    
  }

}
