import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductGallery {
  @PrimaryGeneratedColumn()
  proga_id: number;

  @Column({ default: false })
  proga_primary: boolean;

  @Column({ nullable: true })
  proga_image: string;

  @ManyToOne(() => Product, (product) => product.productGalleries)
  @JoinColumn({ name: "proga_product_id"})
  product: Product;
}