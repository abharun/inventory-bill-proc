import { Router } from "express";
import { inventoryRouter } from "./inventoryRouter";

export const appRouter = Router();

appRouter.use(inventoryRouter);
