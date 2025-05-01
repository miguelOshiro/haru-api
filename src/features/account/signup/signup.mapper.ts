import { plainToInstance } from 'class-transformer';
import { SignUpRequestDto } from './signup.dto';
import { User } from '../../../entities';
import { Role } from 'src/entities/role.entity';

export function SignUpMapper(dto: SignUpRequestDto): User {

  const role = new Role;
  role.id = '333eea5c-4ebe-4ac3-b938-a8e698394444';

  const user = plainToInstance(User, dto);
  user.avatar = 'default.png';
  user.role =  role;

  return user;
}