import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  // host: 'postgres',
  // port: Number(process.env.DB_PORT),
  // username: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@postgres:5432/${process.env.DB_NAME}?schema=public`,
  entities: ['dist/entities/*.js'],
  synchronize: false,
  // ssl: true,
  // logging: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export default AppDataSource;
