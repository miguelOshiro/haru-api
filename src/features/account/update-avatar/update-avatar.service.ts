import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { User } from 'src/entities';
import { JwtTokenService } from 'src/shared/services/jwt/jwt.service';
import { ClsService } from 'nestjs-cls';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UpdateAvatarService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,
    private readonly cls: ClsService,
    private readonly jwt: JwtTokenService,) {}

  async update( updateAvatarDto: UpdateAvatarDto) {

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
    console.log('userrrr!', user);

    // Actualiza los campos con los datos recibidos
    user.avatar = updateAvatarDto.avatar;
    console.log('userrrrUpdateAvtar!', user);
    //await this.userRepository.save(user);

    return {
      message: 'Profile updateAvatar successfully',
      user: user,
    };

  }


}
