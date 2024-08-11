import { BillController } from "controllers";
import { Router } from "express";

export const billRouter = Router();

billRouter.get("/bill", BillController.get_all_bills);
billRouter.get("/bill/:id", BillController.get_bill);
billRouter.post("/bill", BillController.create_bill);
billRouter.patch("/bill/:id", BillController.pay_bill);
billRouter.delete("/bill/:id", BillController.delete_bill);

