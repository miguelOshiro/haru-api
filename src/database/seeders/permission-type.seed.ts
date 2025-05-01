import { PermissionType } from '../../entities/permission-type.entity';
import { DataSource } from 'typeorm';

export async function PermissionTypesSeed(dataSource: DataSource) {
  const repo = dataSource.getRepository(PermissionType);

  const exists = await repo.findOneBy({ name: 'API' });

  if (!exists) {
    await repo.save({
      id: 1,
      name: 'API', 
      description: 'Permission type api',
      isActive: true,
      createdBy: process.env.USER_DEFAULT_SYSTEM!
    });
    console.log('✅ Permission types seeded');
  }
}