import { Request, Response } from "express";
import { BillService, InventoryService } from "services";
import { Bill, BillStatus, Item } from "types";

export const get_all_bills = async (req: Request, res: Response) => {
  const bills = await BillService.get_all();
  return res.status(200).send(bills);
};

export const get_bill = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const bill = await BillService.get_one(id);

  return bill !== null
    ? res.status(200).send(bill)
    : res.status(404).send("Not Found!");
};

export const create_bill = async (req: Request, res: Response) => {
  const items: Item[] = req.body.items;
  let total_price = 0.0;
  for (let item of items) {
    const price = await InventoryService.get_inventory_price(item.name);
    total_price += price * item.amount;
  }
  const new_bill: Bill = {
    items: items,
    tprice: total_price,
    status: BillStatus.pending,
    order_date: new Date(),
  };
  const result = await BillService.insert_bill(new_bill);
};

export const pay_bill = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const bill = await BillService.get_one(id);

  if (!bill) return res.status(404).send("Not Found!");

  await InventoryService.subtract_items(bill.items);
  await BillService.set_finished(id);

  return res.status(200).send("Payment processed!");
};

export const delete_bill = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const bill = await BillService.get_one(id);

  if (!bill) return res.status(404).send("Not Found!");

  await BillService.delete_bill(id);
  return { id };
};
