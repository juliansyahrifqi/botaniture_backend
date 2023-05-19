import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from "typeorm";
import { UserAddress } from "./UserAddress";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  user_name: string;

  @Column({ unique: true })
  user_email: string;

  @Column({ unique: true })
  user_phone_number: string;

  @Column()
  user_photo_profile: string;

  @Column()
  user_role_id: number;

  @Column()
  user_password: string;

  @Column({ nullable: true })
  user_birth_date: Date;

  @Column({ nullable: true })
  user_gender: 'M | F' 

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  userAddress: UserAddress[];
}
