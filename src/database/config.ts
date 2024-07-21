import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const dbHandler: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? "5432"),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DBNAME,
  entities: [],
  synchronize: true,
  logging: false,
});