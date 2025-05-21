import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken, User } from '../../../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken> ,
    private readonly jwtService: JwtService) {}

  async generateAccessToken(user: User): Promise<{ token: string; expiresAt: Date }> {

    const payload: Record<string, any> = {
      email: user.email,
      phone: user.phoneNumber,
      sub: user.id
    };

    const jwtSecret = process.env.JWT_SECRET;
    console.log(jwtSecret);
    if (!jwtSecret) throw new Error('JWT_SECRET is not defined');

    const expiresIn = parseInt(process.env.JWT_EXPIRES_IN?.replace('s', '') ?? '3600', 10);
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: `${expiresIn}s`,
      secret: jwtSecret,
    });
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    return { token, expiresAt };
  }

  async generateRefreshToken(user: User): Promise<{ token: string; expiresAt: Date }> {

    const refreshIn = this.parseDuration(process.env.JWT_REFRESH_EXPIRES_IN ?? '7d');

    const expiresAt = new Date(Date.now() + refreshIn.ms);

    // 🆕 Guardar el refresh token
    const refreshTokenEntity = this.refreshTokenRepository.create({
      token: '',
      user,
      expiresAt,
      revoked: false,
    });

    const saved = await this.refreshTokenRepository.save(refreshTokenEntity);

    const payload: Record<string, any> = {
      email: user.email,
      phone: user.phoneNumber,
      sub: user.id,
      refreshTokenId: saved.id, // 🔑 se agrega el ID en el payload
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: refreshIn.raw,
      secret: process.env.JWT_REFRESH_SECRET,
    });
    
    // ahora actualizas el token real en la DB (opcional)
    saved.token = token;
    await this.refreshTokenRepository.save(saved);
    
    return { token, expiresAt };
  }

  private parseDuration(raw: string): { raw: string; ms: number } {
    const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
    const match = /^(\d+)([smhd])$/.exec(raw);
    if (!match) throw new Error(`Invalid duration format: ${raw}`);
    const [_, num, unit] = match;
    return {
      raw,
      ms: parseInt(num) * multipliers[unit as keyof typeof multipliers],
    };
  }

  async generateChangeEmailToken(user: User, newEmail: string): Promise<{ token: string; expiresAt: Date }> {
    const payload = {
      sub: user.id,
      currentEmail: user.email,
      newEmail,
    };
  
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('JWT_SECRET is not defined');
  
    const expiresIn = parseInt(process.env.JWT_EMAIL_CHANGE_EXPIRES_IN?.replace('s', '') ?? '3600', 10);
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: `${expiresIn}s`,
      secret: jwtSecret,
    });
  
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    return { token, expiresAt };
  }

  async verifyToken(token: string, secret?: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: secret || process.env.JWT_SECRET,
      });
    } catch (err) {
      throw new BadRequestException('Token inválido o expirado');
    }
  }

}