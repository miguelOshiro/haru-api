import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';


@Injectable()
export class UnlockAccountService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> ,) {}

  async update(id: string) {

    const user = await this.userRepository.findOne({
      where: { id },
    });
  
    if(!user) {
      throw new UnauthorizedException(`Credentials are not valid`);
    }

    if(user.status === 'blocked') {
      user.status = 'active';
      user.signinFailed = 0;
      user.dateBlock = null;
      await this.userRepository.save(user);
    }

    return `This action updates a #${user.id} unlockAccount`;
  }


}
