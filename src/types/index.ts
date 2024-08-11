export interface Item {
  name: string;
  amount: number;
}

export enum BillStatus {
  pending = "Pending",
  finished = "Finished",
}

export interface Inventory {
  name: string;
  price: number;
  amount: number;
  last_incoming_amount?: number;
  last_incoming_date?: Date;
  last_outgoing_amount?: number;
  last_outgoing_date?: Date;
  last_edited: Date;
}

export interface Bill {
  items: Item[];
  tprice: number;
  status: BillStatus;
  order_date: Date;
  proc_date?: Date;
}
