import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  procat_id: number;

  @Column()
  procat_name: string;

  @Column()
  procat_slug: string;

  @Column({ nullable: true})
  procat_image: string;

  @OneToMany(() => Product, (product) => product.product_id)
  product: Product[];
}