import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  token?:string
}
