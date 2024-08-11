import {
  delete_inventory,
  get_all_inventory,
  get_inventory,
  insert_inventory,
  update_inventory,
} from "controllers";
import { Router } from "express";

export const inventoryRouter = Router();

inventoryRouter.get("/inventory", get_all_inventory);
inventoryRouter.get("/inventory/:id", get_inventory);
inventoryRouter.post("/inventory", insert_inventory);
inventoryRouter.patch("/inventory/:id", update_inventory);
inventoryRouter.delete("/inventory/:id", delete_inventory);
