import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfirmChangeDto } from './dto/confirm-change.dto';
import { User } from 'src/entities';
import { JwtTokenService } from 'src/shared/services/jwt/jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConfirmChangeService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,
    private readonly jwt: JwtTokenService,) {}

  async confirmChange(confirmChangeDto: ConfirmChangeDto) {

    const payload = await this.jwt.verifyToken(confirmChangeDto.token);
    console.log('payloaddd',payload);

    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });
    
    if (!user) throw new UnauthorizedException(`Credentials aaare not valid`);
    
    user.email = payload.newEmail;
    console.log('USSSERRRRRhh', user);
    //await this.userRepository.save(user);

    return 'This action adds a new confirmChange';
  }


}
