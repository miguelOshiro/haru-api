import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';

export async function UserSeed(dataSource: DataSource) {
  const repo = dataSource.getRepository(User);

  const exists = await repo.findOneBy({ email: 'admin@haru.com' });
  if (!exists) {
    await repo.save({
      email: 'admin@haru.com',
      password: await bcrypt.hash('Admin2025$$', 10),
      phoneNumber:'946678198',
      isActive: true,
      firstname: 'Jose',
      lastname: 'Oshiro',
      avatar: '',
      role: {
        id: '7c0eea5c-4ebe-4ac3-b938-a8e6983929bc'
      }
    });
    console.log('✅ Admin user seeded');
  }
}