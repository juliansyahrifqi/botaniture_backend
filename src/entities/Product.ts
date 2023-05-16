import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductCategory } from "./ProductCategory";
import { ProductGallery } from "./ProductGallery";

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

  @Column({ default: 0})
  product_stock: number;

  @Column({ default: 1, type: "numeric" })
  product_weight: number;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @OneToOne(() => ProductCategory, (productCategory) => productCategory.procat_id)
  @JoinColumn({ name: "product_category_id"})
  productCategory: ProductCategory;

  @OneToMany(() => ProductGallery, (productGallery) => productGallery.product)
  productGalleries: ProductGallery[];
}