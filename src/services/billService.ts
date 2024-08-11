import { dbHandler } from "database";
import { BillEntity } from "database/entities/BillEntity";
import { Bill, BillStatus } from "types";

export const get_all = async () => {
  return await dbHandler.getRepository(BillEntity).find();
};

export const get_one = async (id: number) => {
  return await dbHandler.getRepository(BillEntity).findOneBy({ id: id });
};

export const insert_bill = async (bill: Bill) => {
  const result = await dbHandler.getRepository(BillEntity).insert(bill);
  return result.raw[0];
};

export const set_finished = async (id: number) => {
  return await dbHandler
    .createQueryBuilder()
    .update(BillEntity)
    .set({ status: BillStatus.finished, proc_date: new Date() })
    .where({ id: id })
    .execute();
};

export const delete_bill = async (id: number) => {
  await dbHandler.getRepository(BillEntity).delete({ id: id });
  return { id };
};
