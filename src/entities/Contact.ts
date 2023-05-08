import { Column, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  contact_id: number;

  @Column()
  contact_name: string;

  @Column()
  contact_account: string;

  @Column()
  contact_link: string;
  
  @Column({ nullable: true})
  contact_image: string;
}