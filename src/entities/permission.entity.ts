import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { RolePermission } from "../entities/role-permission.entity";
import { PermissionType } from "./permission-type.entity";
import { BaseEntity } from "./base.entity";



@Entity('permissions')
export class Permission extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200, unique: true })
    value: string;

    @Column({ type: 'varchar', length: 200 })
    action: string;

    @OneToMany(() => RolePermission, (rolesPermissions) => rolesPermissions.permission)
    rolesPermissions: RolePermission[];

    @ManyToOne( () => PermissionType, (permissionType) => permissionType.permission) 
    @JoinColumn({ name: 'permission_type_id'})
    permissionType: PermissionType;

}
