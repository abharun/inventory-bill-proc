import { Router } from "express";

export const inventoryRouter = Router();

inventoryRouter.get("/inventory");
inventoryRouter.get("/inventory:id");
inventoryRouter.post("/inventory");
inventoryRouter.put("/inventory:id");
inventoryRouter.delete("/inventory:id");
