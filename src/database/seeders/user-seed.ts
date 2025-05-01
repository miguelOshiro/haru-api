import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';

export async function UserSeed(dataSource: DataSource) {
  const repo = dataSource.getRepository(User);

  const exists = await repo.findOneBy({ email: 'admin@haru.com' });
  if (!exists) {
    await repo.save({
      email: 'admin@haru.com',
      password: await bcrypt.hash('admin123', 10),
      userType: 'admin',
    });
    console.log('✅ Admin user seeded');
  }
}