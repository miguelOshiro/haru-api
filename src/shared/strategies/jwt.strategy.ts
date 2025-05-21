import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClsService } from 'nestjs-cls';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken, User } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(

    @InjectRepository( User )
    private readonly userRepository: Repository<User>,

    @InjectRepository( RefreshToken )
    private readonly refreshTokenRepository: Repository<RefreshToken>,

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
      passReqToCallback: true,
    });
  }

  // payload: { email: string; sub: string }

  async validate(request: Request, payload: any) {
    console.log('✅ Test !!!! JwtStrategy: payload received', payload);

    const method = request.method;    
    const url = request.url; 

    const user = await this.userRepository.findOne({ 
      where: { id: payload.sub },
      relations: [
          'role', 
          'role.rolesPermissions', 
          'role.rolesPermissions.permission',
          'role.rolesPermissions.permission.permissionType'
      ],
    });

    const existPermission = user?.role.rolesPermissions
        .filter(rp => rp.permission?.permissionType?.name === 'API')
        .filter(rp => rp.permission?.action === method)
        .filter(rp => rp.permission?.value === url)


    if(!user)
        throw new UnauthorizedException('Token not valid!');

    if(user.status !== 'active')
        throw new UnauthorizedException('User is inactive, talk with an Admin!');

    if (!user.role?.isActive) {
        throw new UnauthorizedException('Role is inactive');
    }

    // if (user.haveConfirmEmail) {
    //   if(user.confirmEmail)
    //     throw new UnauthorizedException('User I have already confirmed your email');
    // }

    // 🔐 VALIDAR REFRESH TOKEN REVOCADO SI EXISTE EN PAYLOAD
    if (payload.refreshTokenId) {
      const refreshToken = await this.refreshTokenRepository.findOne({
        where: {
          id: payload.refreshTokenId,
          revoked: false,
        },
      });

      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token is revoked or invalid');
      }

      // verifica si ya expiró
      if (new Date(refreshToken.expiresAt) < new Date()) {
        throw new UnauthorizedException('Refresh token expirado');
      }
    }

    if (!existPermission ) {
      throw new UnauthorizedException(`Permission no exist ${method}- ${url}`);
    }

    if (existPermission.length === 0) {
      throw new UnauthorizedException(`Permission no existtt ${method}- ${url}`);
    }

    this.cls.set('user', user);

    return user;

  }
}