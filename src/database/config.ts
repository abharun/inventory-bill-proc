import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { InventoryEntity } from "./entities/InventoryEntity";
import { BillEntity } from "./entities/BillEntity";

dotenv.config();

export const dbHandler: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? "5432"),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DBNAME,
  entities: [InventoryEntity, BillEntity],
  synchronize: true,
  logging: false,
});