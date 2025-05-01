import { Role } from "src/entities/role.entity";
import { DataSource } from "typeorm";

    

export async function RoleSeed(dataSource: DataSource) {
  const repo = dataSource.getRepository(Role);

  const exists = await repo.findOneBy({ name: 'administrator' });

  if (!exists) {
    await repo.save({
      id: '7c0eea5c-4ebe-4ac3-b938-a8e6983929bc', 
      name: 'administrator', 
      description: 'total control of the system',
      isActive: true, 
    });
    await repo.save({
      id: '333eea5c-4ebe-4ac3-b938-a8e698394444', 
      name: 'enrollee', 
      description: 'user registered in the system',
      isActive: true, 
    });
    console.log('✅ Admin role seeded');
  }


}