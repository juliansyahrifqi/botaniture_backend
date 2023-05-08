import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  quote_id: number;

  @Column()
  quote_person_name: string;

  @Column()
  quote_value: string;
  
  @Column({ nullable: true})
  quote_image: string;
}