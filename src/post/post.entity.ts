import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, 
    UpdateDateColumn, ManyToOne } from 'typeorm';
import { Exclude } from "class-transformer";
import { User } from 'src/user/user.entity';
import { text } from 'stream/consumers';
@Entity()

export class Post {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly title: string;

  @Column({unique : true})
  readonly content: string;

  @CreateDateColumn()
  readonly created_at : Date;

  @UpdateDateColumn()
  readonly updated_at : Date;
  
  @Exclude()
  @ManyToOne(() => User, (user) => user.posts)
  user : User

}