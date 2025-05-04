import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

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

    const payload: Record<string, any> = {
      email: user.email,
      phone: user.phoneNumber,
      sub: user.id
    };

    const refreshIn = this.parseDuration(process.env.JWT_REFRESH_EXPIRES_IN ?? '7d');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: refreshIn.raw,
      secret: process.env.JWT_REFRESH_SECRET,
    });
    const expiresAt = new Date(Date.now() + refreshIn.ms);
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
}