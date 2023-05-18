import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { UserAddress } from "./UserAddress";
import { City } from "./City";

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  prov_id: number;

  @Column()
  prov_name: string;

  @OneToMany(() => City, (city) => city.province)
  city: City[];
}
