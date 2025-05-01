import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { ClsService } from 'nestjs-cls';
import { Injectable } from '@nestjs/common';

@EventSubscriber()
@Injectable()
export class BaseSubscriber implements EntitySubscriberInterface {
  constructor(private readonly cls: ClsService) {}

  beforeInsert(event: InsertEvent<any>): void {
    const user = this.cls.get('user');
    const email = user?.email ?? 'system@haru.com';

    if ('createdBy' in event.entity && !event.entity.createdBy) {
      event.entity.createdBy = email;
    }
  }

  beforeUpdate(event: UpdateEvent<any>): void {
    const user = this.cls.get('user');
    const email = user?.email ?? 'system@haru.com';

    if (event.entity && 'updatedBy' in event.entity) {
      event.entity.updatedBy = email;
    }
  }
}