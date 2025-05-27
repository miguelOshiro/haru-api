import { DataSource } from 'typeorm';
import { User, Permission, PermissionType, Role, RolePermission, RefreshToken } from '../../entities';
import * as dotenv from 'dotenv';
import { UserSeed } from './user.seed';
import { RoleSeed } from './role.seed';
import { PermissionTypesSeed } from './permission-type.seed';
import { PermissionSeed } from './permission.seed';
import { RolePermissionSeed } from './role-permission.seed';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [PermissionType, Permission, Role, RolePermission, User, RefreshToken],
  synchronize: false,
  ssl: { rejectUnauthorized: false },
});
async function runSeeds() {
  await AppDataSource.initialize();
  await PermissionTypesSeed(AppDataSource);
  await PermissionSeed(AppDataSource);
  await RoleSeed(AppDataSource);
  await RolePermissionSeed(AppDataSource);
  await UserSeed(AppDataSource);
  await AppDataSource.destroy();
}

runSeeds().catch((err) => {
  console.error('❌ Seed failed', err);
  process.exit(1);
});