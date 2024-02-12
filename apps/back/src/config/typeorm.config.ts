import { DataSource } from 'typeorm';
import * as entities from '../infrastructure/db/entities-index';
import { EnvConfig } from './env.config';
// import * as migrations from '../infrastructure/db//migrations-index';


console.log(EnvConfig.DB_HOST)
export default new DataSource({
  type: 'postgres',
  database: EnvConfig.DB_NAME,
  port: EnvConfig.DB_PORT || 5432,
  host: EnvConfig.DB_HOST || 'localhost',
  username: EnvConfig.DB_USERNAME || 'postgres',
  password: EnvConfig.DB_PASSWORD || 'postgres',
  synchronize: true,
  // logging: ['query', 'error'],
  entities: Object.values(entities),
  // migrations: Object.values(migrations),
  subscribers: [],
  migrationsTableName: 'migrations',
  migrationsRun: true,
});
