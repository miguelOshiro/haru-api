import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ClsService } from 'nestjs-cls';
import { JwtTokenService } from 'src/shared/services/jwt/jwt.service';
import { User } from 'src/entities';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UpdateProfileService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,
    private readonly cls: ClsService,
    private readonly jwt: JwtTokenService,) {}

  async update(updateProfileDto: UpdateProfileDto) {

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
    
    const phoneInUse = await this.userRepository.findOne({
      where: {
        phoneNumber: updateProfileDto.phoneNumber,
        id: Not(user.id), // aseguramos que no sea él mismo
      },
    });
    
    if (phoneInUse) {
      throw new BadRequestException('Phone number is already in use by another user');
    }
    console.log('phoneInUseeee!', phoneInUse);

    user.firstname = updateProfileDto.firstname;
    user.lastname = updateProfileDto.lastname;
    user.phoneNumber = updateProfileDto.phoneNumber;

    console.log('userrrrUpdate!', user);

    await this.userRepository.save(user);

    // Elimina campos sensibles para la respuesta
    const { password, ...safeUser } = user;

    return {
      message: 'Profile updated successfully',
      user: safeUser,
    };

  }

}
