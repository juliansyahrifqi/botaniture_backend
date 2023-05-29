import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @Column()
  cart_product_qty: number;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: 'cart_user_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.carts)
  @JoinColumn({ name: 'cart_product_id' })
  product: Product;
}
