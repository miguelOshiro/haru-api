import { plainToInstance } from 'class-transformer';
import { SignUpRequestDto } from './signup.dto';
import { User } from '../../../entities';

export function SignUpMapper(dto: SignUpRequestDto): User {
  const user = plainToInstance(User, dto);
  user.avatar = 'default.png';
  return user;
}