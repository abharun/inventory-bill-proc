import { dbHandler } from "database";
import { InventoryEntity } from "database/entities/InventoryEntity";

export const get_all = async () => {
  return await dbHandler.getRepository(InventoryEntity).find();
};
