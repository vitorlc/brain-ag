import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Farmer } from './farmers/entities/farmer.entity';
import { Farm } from './farms/entities/farm.entity';
import { Harvest } from './cultivation/harvests/entities/harvest.entity';
import { Crop } from './cultivation/crops/entities/crop.entity';

const config: MikroOrmModuleOptions = {
  entities: [Farmer, Farm, Harvest, Crop],
  dbName: 'brain_ag',
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  driver: PostgreSqlDriver,
  debug: true,
  forceEntityConstructor: true,
  strict: false,
  migrations: {
    path: 'src/migrations', 
  },
};

export default config;
