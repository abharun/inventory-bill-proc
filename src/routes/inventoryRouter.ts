import { InventoryController } from "controllers";
import { Router } from "express";

export const inventoryRouter = Router();

inventoryRouter.get("/inventory", InventoryController.get_all_inventory);
inventoryRouter.get("/inventory/:id", InventoryController.get_inventory);
inventoryRouter.post("/inventory", InventoryController.insert_inventory);
inventoryRouter.patch("/inventory/:id", InventoryController.update_inventory);
inventoryRouter.delete("/inventory/:id", InventoryController.delete_inventory);
