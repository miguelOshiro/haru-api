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
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 1
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 2
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 3
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 4
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 5
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 6
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 7
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 8
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 9
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 10
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 11
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 12
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 13
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 14
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 15
        },
    });
    await repo.save({
        role: {
            id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
        },
        permission: {
            id: 16
        },
    });
    console.log('✅ Role Permission seeded');
  }