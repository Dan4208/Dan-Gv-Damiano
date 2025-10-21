import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import * as path from 'path';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [User],
  migrations: [path.join(__dirname, './migration/*.ts')],
  synchronize: false,
});
