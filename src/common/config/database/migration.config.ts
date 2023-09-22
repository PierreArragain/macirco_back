import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseConfiguration } from './database.configuration';

dotenv.config({ path: `./src/common/envs/local.env` });

const datasource = new DataSource(
  <DataSourceOptions>new DatabaseConfiguration().createTypeOrmOptions(),
); // config is one that is defined in datasource.config.ts file
datasource.initialize();
console.log('datasource', datasource);
export default datasource;
