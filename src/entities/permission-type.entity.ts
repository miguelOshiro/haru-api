
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Permission } from "../entities/permission.entity";
import { BaseEntity } from "./base.entity";


@Entity('permission_types')
export class PermissionType extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @OneToMany( () => Permission, (permission) => permission.permissionType)
    permission: Permission[];


}
