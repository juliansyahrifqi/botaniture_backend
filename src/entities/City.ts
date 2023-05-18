import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { UserAddress } from "./UserAddress";
import { Province } from "./Province";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  city_id: number;

  @Column()
  city_name: string;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.city)
  userAddress: UserAddress;

  @ManyToOne(() => Province, (province) => province.city)
  province: Province;
}
