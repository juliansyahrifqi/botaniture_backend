import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  uspro_id: number;

  @Column()
  uspro_birthdate: Date;

  @Column()
  uspro_gender: string;

  @OneToOne(() => User, (user) => user.userProfile)
  @JoinColumn({ name: 'uspro_user_id'})
  user: User;
}
