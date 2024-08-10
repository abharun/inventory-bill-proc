import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BillStatus, Item } from "types";

@Entity({ name: "Bill" })
export class BillEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "items", type: "jsonb", array: true })
  items: Item[];

  @Column({ name: "total_price", type: "float" })
  total_price: number;

  @Column({ name: "status", type: "varchar", length: 255 })
  name: BillStatus;

  @Column({ name: "order_date", type: "timestamp" })
  order_date: Date;

  @Column({ name: "proc_date", type: "timestamp" })
  proc_date: Date;
}