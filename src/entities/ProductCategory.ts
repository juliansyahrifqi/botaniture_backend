import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}