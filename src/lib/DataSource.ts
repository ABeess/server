import { DataSource } from 'typeorm'

const myDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  url: process.env.DATABASE_URL,
  entities: ['dist/entities/*.js'],
  synchronize: true,
  logging: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
})

export default myDataSource
