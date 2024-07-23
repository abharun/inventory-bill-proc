import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Inventory" })
export class InventoryEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name", type: "varchar", length: 255 })
  name: string;

  @Column({ name: "price", type: "float" })
  price: number;

  @Column({ name: "amount", type: "int" })
  amount: number;

  @Column({ name: "last_incoming_amount", type: "int", nullable: true })
  last_incoming_amount: number;

  @Column({ name: "last_incoming_date", type: "timestamp", nullable: true })
  last_incoming_date: Date;

  @Column({ name: "last_outgoing_amount", type: "int", nullable: true })
  last_outgoing_amount: number;

  @Column({ name: "last_outgoing_date", type: "timestamp", nullable: true })
  last_outgoing_date: Date;

  @Column({ name: "last_edited", type: "timestamp" })
  last_edited: Date;
}