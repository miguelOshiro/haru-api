import { Permission } from "../../entities/permission.entity";
import { DataSource } from "typeorm";

export async function PermissionSeed(dataSource: DataSource) {
    const repo = dataSource.getRepository(Permission);
  
    const exists = await repo.findOneBy({ value: '/api/account/me' });
  
    if (!exists) {
      await repo.save({
        id: 1,
        value: '/api/account/me', 
        action: 'GET',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      await repo.save({
        id: 2,
        value: '/api/account/avatar', 
        action: 'PUT',
        isActive: true,
        permissionType: {
            id: 1
        },
        createdBy: process.env.USER_DEFAULT_SYSTEM!
      });
      console.log('✅ Permission seeded');
    }
  }