import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Article } from "./Article";
import { Comment } from "./Comment";

@Entity('users')
export class User {
  @PrimaryColumn({ unique: true })
  email: string;

  @Column({ unique: true, nullable: false })
  userName: string;
  @Column({ type: "text", nullable: false })
  password?: string;
  @Column({ type: "text", nullable: true })
  bio?: string;

  @Column({ nullable: true })
  image?: string;

  @OneToMany(()=>Article,(article) => article.author)
  article: Article[];
  @OneToMany(()=>Comment,(comment) => comment.userComment)
  comment: Comment[];
  
  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  token?:string
}
