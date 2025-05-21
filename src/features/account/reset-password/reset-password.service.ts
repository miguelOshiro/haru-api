import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtTokenService } from 'src/shared/services/jwt/jwt.service';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResetPasswordService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,
    private readonly jwt: JwtTokenService,) {}


  async resetPassword(token: string, newPassword: string) {

    const payload = await this.jwt.verifyToken(token);

    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });
    //console.log('USSSERRRRR', user);

    if (!user) throw new UnauthorizedException(`Credentials aaare not valid`);
  
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
  
    return { message: 'Contraseña actualizada correctamente' };
  }
}
