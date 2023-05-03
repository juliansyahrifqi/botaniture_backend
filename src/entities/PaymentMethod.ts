import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @Column()
  payment_name: string;

  @Column()
  payment_number: string;

  @Column()
  payment_account_name: string;

  @Column({ nullable: true})
  payment_image: string;
}