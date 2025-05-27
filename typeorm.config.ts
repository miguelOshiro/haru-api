import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [process.env.NODE_ENV === 'production' ? 'dist/entities/*.js' : 'src/entities/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  ssl: { rejectUnauthorized: false },
});