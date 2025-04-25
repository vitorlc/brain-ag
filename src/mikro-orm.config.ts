import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { config as loadEnv } from 'dotenv';
import { Farmer } from './farmers/entities/farmer.entity';
import { Farm } from './farms/entities/farm.entity';
import { Harvest } from './cultivation/harvests/entities/harvest.entity';
import { Crop } from './cultivation/crops/entities/crop.entity';

loadEnv();

const config: MikroOrmModuleOptions = {
  entities: [Farmer, Farm, Harvest, Crop],
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  driver: PostgreSqlDriver,
  debug: process.env.NODE_ENV !== 'production',
  forceEntityConstructor: true,
  strict: false,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
};

export default config;
