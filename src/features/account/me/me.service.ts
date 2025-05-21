import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class MeService {
  constructor(private readonly cls: ClsService) {}

  getCurrentUser() {
    const user = this.cls.get('user');
    if (!user) {
      throw new Error('User context not found');
    }

    return user;
  }
}