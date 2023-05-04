import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductCategory } from "./ProductCategory";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  product_name: string;

  @Column()
  product_description: string;

  @Column()
  product_slug: string;

  @Column({ type: "numeric" })
  product_price: number;

  @Column({ type: "numeric" })
  product_discount: number;

  @Column({ nullable: true})
  product_image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => ProductCategory, (productCategory) => productCategory.procat_id)
  @JoinColumn({ name: "product_category_id"})
  productCategory: ProductCategory;
}