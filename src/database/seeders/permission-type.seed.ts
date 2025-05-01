
import { PermissionType } from '../../entities/permission-type.entity';
import { DataSource, Repository } from 'typeorm';

// @Injectable()
// export class PermissionTypeSeed {

//   constructor(
//     @InjectRepository(PermissionType)
//     private readonly permissionTypeRepository: Repository<PermissionType>,
//   ) {}

//   async run() {
//     const permissionTypes = [
//       { name: 'API', createdBy: process.env.USER_DEFAULT_SYSTEM! },
//     ];

//     for (const permissionType of permissionTypes) {
//       const exists = await this.permissionTypeRepository.findOne({
//         where: { name: permissionType.name }
//       });

//       if (!exists) {
//         await this.permissionTypeRepository.save(permissionType);
//         console.log(`Permission type ${permissionType.name} has been seeded`);
//       } else {
//         console.log(`Permission type ${permissionType.name} already exists`);
//       }
//     }

//     console.log('Permission types seeding completed');
//   }
// }


export async function PermissionTypesSeed(dataSource: DataSource) {
  const repo = dataSource.getRepository(PermissionType);

  const exists = await repo.findOneBy({ name: 'API' });

  if (!exists) {
    await repo.save({
      id: 1,
      name: 'API', 
      description: 'Permission type api',
      isActive: true,
    });
    console.log('✅ Admin Permission types seeded');
  }


}