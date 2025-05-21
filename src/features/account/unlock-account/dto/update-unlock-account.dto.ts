import { PartialType } from '@nestjs/swagger';
import { CreateUnlockAccountDto } from './create-unlock-account.dto';

export class UpdateUnlockAccountDto extends PartialType(CreateUnlockAccountDto) {

    userId: string;
}
