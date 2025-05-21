import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { RolePermission } from './role-permission.entity';

@Entity()
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => RolePermission, (rolesPermissions) => rolesPermissions.role)
  rolesPermissions: RolePermission[]; 

  @OneToMany( () => User, (user) => user.role)
  user: User[];


}