import { Router } from "express";
import { inventoryRouter } from "./inventoryRouter";
import { billRouter } from "./billRouter";

export const appRouter = Router();

appRouter.use(inventoryRouter);
appRouter.use(billRouter);
