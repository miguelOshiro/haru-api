
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from './role.entity';
import { RefreshToken } from './token.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, unique: true, name: 'phone_number' })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  firstname: string;

  @Column({ type: 'varchar', length: 50 })
  lastname: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @Column({ default: 'active'})
  status: string;

  @Column({ name: 'signin_failed', default: 0  })
  signinFailed: number;

  @Column({ type: 'timestamp', nullable: true, name: 'date_block' })
  dateBlock: Date | null;

  @Column({ default: false, name: 'confirm_email' })
  confirmEmail: boolean;

  @Column({ default: false, name: 'have_confirm_email' })
  haveConfirmEmail: boolean;

  @Column({ default: false, name: 'have_two_factor' })
  haveTwoFactor: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'two_factor' })
  twoFactor: string;

  @ManyToOne( () => Role, (role) => role.user, { nullable: false })
  @JoinColumn({ name: 'role_id'})
  role: Role;

  // 🔁 Relación con RefreshToken
  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

}