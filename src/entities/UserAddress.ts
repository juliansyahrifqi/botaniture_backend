import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { City } from "./City";

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn()
  usad_id: number;

  @Column()
  usad_address: string;

  @Column()
  usad_postcode: string;

  @Column()
  usad_status: string;

  @ManyToOne(() => User, (user) => user.userAddress)
  @JoinColumn({ name: 'usad_user_id'})
  user: User;

  @ManyToOne(() => City, (city) => city.userAddress)
  @JoinColumn({ name: 'usad_city_id'})
  city: City;
}
