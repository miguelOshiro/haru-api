import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../entities/role.entity";
import { Permission } from "./permission.entity";


@Entity('roles_permissions')
// Índice único para asegurar que no se asigne el mismo permiso al mismo rol múltiples veces
@Index(['role', 'permission'], { unique: true }) 
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number; // Clave primaria simple para la tabla de unión

  // Relación con Role (Muchos RolesPermissions pertenecen a Un Role)
  @ManyToOne(() => Role, (role) => role.rolesPermissions, { 
      nullable: false, 
      onDelete: 'CASCADE' // Si se borra un rol, se borran sus asignaciones de permisos
  })
  @JoinColumn({ name: 'role_id' }) // Nombre explícito de la columna FK en la BD
  role: Role;

  // Relación con Permission (Muchos RolesPermissions pertenecen a Un Permission)
  @ManyToOne(() => Permission, (permission) => permission.rolesPermissions, { 
      nullable: false, 
      onDelete: 'CASCADE' // Si se borra un permiso, se borran sus asignaciones a roles
  })
  @JoinColumn({ name: 'permission_id' }) // Nombre explícito de la columna FK en la BD
  permission: Permission;
}
