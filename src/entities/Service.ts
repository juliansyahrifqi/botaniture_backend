import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column()
  service_name: string;

  @Column()
  service_desc: string;
}