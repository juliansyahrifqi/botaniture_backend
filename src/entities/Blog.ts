import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  blog_id: number;

  @Column()
  blog_slug: string;

  @Column()
  blog_title: string;

  @Column({ type: 'text' })
  blog_desc: string;

  @Column()
  blog_cover: string;

  @CreateDateColumn()
  blog_createdAt: Date;

  @UpdateDateColumn()
  blog_updatedAt: Date;

  @ManyToOne(() => User, (user) => user.blogs)
  @JoinColumn({ name: 'blog_user_id' })
  user: User;
}
