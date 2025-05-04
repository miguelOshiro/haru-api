import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClsService } from 'nestjs-cls';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(

    @InjectRepository( User )
        private readonly userRepository: Repository<User>,

    private readonly cls: ClsService,
    private readonly configService: ConfigService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment');
    }

    console.log('🟢 JwtStrategy initialized with secret:', jwtSecret);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { email: string; sub: string }) {
    console.log('✅ Test !!!! JwtStrategy: payload received', payload);
    this.cls.set('user', payload);

    const user = await this.userRepository.findOne({ 
      where: { id: payload.sub },
      relations: [
          'role', 
          'role.rolesPermissions', 
          'role.rolesPermissions.permission',
          'role.rolesPermissions.permission.permissionType'
      ],
    });

    console.log('USSSSER', user)

    if(!user)
        throw new UnauthorizedException('Token not valid!');

    if(!user.isActive)
        throw new UnauthorizedException('User is inactive, talk with an Admin!');

    if (!user.role?.isActive) {
        throw new UnauthorizedException('Role is inactive');
    }

    // return Promise.resolve({
    //   email: payload.email,
    //   userId: payload.sub,
    // });

    return user;

  }
}