import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from "typeorm";
import { UserProfile } from "./UserProfile";
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
  user_role_id: number;

  @Column()
  user_password: string;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  userProfile: UserProfile;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  userAddress: UserAddress[];
}
