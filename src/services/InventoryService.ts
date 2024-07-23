import { dbHandler } from "database";
import { InventoryEntity } from "database/entities/InventoryEntity";
import { Inventory } from "types";

export const get_all = async () => {
  return await dbHandler.getRepository(InventoryEntity).find();
};

export const get_one = async (id: number) => {
  return await dbHandler.getRepository(InventoryEntity).findOneBy({ id: id });
};

export const insert_inventory = async (inventory: Inventory) => {
  const result = await dbHandler
    .getRepository(InventoryEntity)
    .insert(inventory);
  return result.raw[0];
};

export const add_inventory_amount = async (
  id: number,
  originAmount: number,
  addAmount: number
) => {
  return await dbHandler
    .createQueryBuilder()
    .update(InventoryEntity)
    .set({
      amount: originAmount + addAmount,
      last_incoming_amount: addAmount,
      last_incoming_date: new Date(),
      last_edited: new Date(),
    })
    .where("id = :id", { id })
    .execute();
};

export const edit_inventory_price = async (id: number, price: number) => {
  return await dbHandler
    .createQueryBuilder()
    .update(InventoryEntity)
    .set({ price: price, last_edited: new Date() })
    .where("id = :id", { id })
    .execute();
};

export const delete_inventory = async (id: number) => {
  await dbHandler.getRepository(InventoryEntity).delete({ id: id });
  return { id };
};
