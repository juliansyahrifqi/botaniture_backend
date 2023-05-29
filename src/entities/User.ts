import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from "typeorm";
import { UserAddress } from "./UserAddress";
import { Blog } from "./Blog";
import { Cart } from "./Cart";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  user_name: string;

  @Column({ unique: true })
  user_email: string;

  @Column({ unique: true, length: 15})
  user_phone_number: string;

  @Column({ nullable: true })
  user_photo_profile: string;

  @Column({ default: 2})
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

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
