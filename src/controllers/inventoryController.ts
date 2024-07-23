import { Request, Response } from "express";
import { InventoryService } from "services";
import { Inventory } from "types";

export const get_all_inventory = async (_req: Request, res: Response) => {
  const inventories = await InventoryService.get_all();
  return res.status(200).send(inventories);
};

export const get_inventory = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const inventory = await InventoryService.get_one(id);
  return inventory !== null
    ? res.status(200).send(inventory)
    : res.status(404).send("Not Found!");
};

export const insert_inventory = async (req: Request, res: Response) => {
  const inventory: Inventory = {
    ...req.body,
    last_incoming_amount: req.body.amount,
    last_incoming_date: new Date(),
    last_edited: new Date(),
  };
  const result = await InventoryService.insert_inventory(inventory);
  return res.status(200).send(result);
};

export const update_inventory = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const inventory = await InventoryService.get_one(id);

  if (!inventory) return res.status(404).send("Not Found!");

  const data = req.body;

  if ("amount" in data) {
    const originAmount = inventory.amount;
    const addAmount = req.body.amount;

    const result = await InventoryService.add_inventory_amount(
      id,
      originAmount,
      addAmount
    );
    return res.status(200).send(result);
  } else if ("price" in data) {
    const price = req.body.price;
    const result = await InventoryService.edit_inventory_price(id, price);
    return res.status(200).send(result);
  }
};

export const delete_inventory = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const inventory = await InventoryService.get_one(id);

  if (!inventory) return res.status(404).send("Not Found!");

  const result = await InventoryService.delete_inventory(id);
  return res.status(200).send(result);
};
