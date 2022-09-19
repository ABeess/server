import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/entities/*.js'],
  synchronize: false,
  logging: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export default AppDataSource;
