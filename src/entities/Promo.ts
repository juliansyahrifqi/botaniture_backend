import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Promo {
  @PrimaryGeneratedColumn()
  promo_id: number;

  @Column()
  promo_name: string;

  @Column()
  promo_desc: string;

  @Column()
  promo_end_date: Date;

  @ManyToMany(() => Product)
  @JoinTable({ 
    name: 'promo_product', 
    joinColumn: { name: "promoduct_promo_id" }, 
    inverseJoinColumn: { name: "promoduct_product_id" }
  })
  products: Product[]
}