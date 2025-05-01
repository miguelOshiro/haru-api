import { RolePermission } from "../../entities/role-permission.entity";
import { DataSource } from "typeorm";

export async function RolePermissionSeed(dataSource: DataSource) {
    const repo = dataSource.getRepository(RolePermission);
  
    // const exists = await repo.findOneBy({ permissionId: 'admin@haru.com' });
    // if (!exists) {
    //   
    //   console.log('✅ Admin user seeded');
    // }

    await repo.save({
        role: {
            id: '7c0eea5c-4ebe-4ac3-b938-a8e6983929bc', 
        },
        permission: {
            id: 1
        },
    });
    await repo.save({
        role: {
            id: '7c0eea5c-4ebe-4ac3-b938-a8e6983929bc', 
        },
        permission: {
            id: 2
        },
    });
    console.log('✅ Role Permission seeded');
  }