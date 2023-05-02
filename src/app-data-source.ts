import { DataSource } from "typeorm";

const myDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: "postgres",
  password: "123456",
  database: 'Botaniture',
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  logging: true,
  synchronize: true,
});

export  {myDataSource};