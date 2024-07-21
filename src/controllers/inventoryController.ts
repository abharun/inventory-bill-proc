import { Request, Response } from "express";
import { InventoryService } from "services";

export const get_all_inventory = async (_req: Request, res: Response) => {
    const inventories = await InventoryService.get_all();
    return res.status(200).send(inventories);
};
