import { Router } from "express";
import { inventoryRouter } from "./inventoryRouter";

const appRouter = Router();

appRouter.use(inventoryRouter);

