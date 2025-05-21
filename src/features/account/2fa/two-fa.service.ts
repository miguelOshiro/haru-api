import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { User } from 'src/entities';
import { ClsService } from 'nestjs-cls';
import { JwtTokenService } from 'src/shared/services/jwt/jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from 'src/shared/services/email/brevo.service';
import { StorageService } from 'src/shared/services/storage/storage.service';

@Injectable()
export class TwoFaService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,
    private readonly cls: ClsService,
    private readonly jwt: JwtTokenService,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,) {}

  async generateSecret() {

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

    const secret = speakeasy.generateSecret({
      name: `Haru (${user.email})`,
    });

    user.haveTwoFactor = true;
    user.twoFactor = secret.base32;
    console.log('USerrrr', user);
    await this.userRepository.save(user);

    return {
      otpUrl: secret.otpauth_url as string,
      secret: secret.base32,
    };
  }

  async generateQrCode(otpUrl: string): Promise<string> {
    return await qrcode.toDataURL(otpUrl) as string;
  }
}