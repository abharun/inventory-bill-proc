import { dbHandler } from "database";
import { InventoryEntity } from "database/entities/InventoryEntity";
import { Inventory, Item } from "types";

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

export const get_inventory_price = async (name: string) => {
  const inventory = await dbHandler
    .getRepository(InventoryEntity)
    .createQueryBuilder("inventory")
    .select(["inventory.price"])
    .where("name = :name", { name: name })
    .getOne();
  return inventory.price;
};

export const subtract_items = async (items: Item[]) => {
  for (let item of items) {
    const inventory = await dbHandler
      .getRepository(InventoryEntity)
      .createQueryBuilder("inventory")
      .select(["inventory.amount"])
      .where("name = :name", { name: item.name })
      .getOne();
    const new_amount = inventory.amount - item.amount;
    await dbHandler
      .createQueryBuilder()
      .update(InventoryEntity)
      .set({
        amount: new_amount,
        last_outgoing_amount: item.amount,
        last_outgoing_date: new Date(),
      })
      .where("name = :name", { name: item.name })
      .execute();
  }
};

export const delete_inventory = async (id: number) => {
  await dbHandler.getRepository(InventoryEntity).delete({ id: id });
  return { id };
};
