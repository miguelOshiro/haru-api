import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as dotenv from 'dotenv';
import { UserSeed } from './user-seed';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: false,
});

async function runSeeds() {
  await AppDataSource.initialize();
  await UserSeed(AppDataSource);
  await AppDataSource.destroy();
}

runSeeds().catch((err) => {
  console.error('❌ Seed failed', err);
  process.exit(1);
});