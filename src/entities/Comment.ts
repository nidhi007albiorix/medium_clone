import { Entity ,PrimaryColumn,Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, Generated} from "typeorm";
import { Article } from "./Article";
import { User } from "./User";

@Entity('comments')
export class Comment {

    @PrimaryColumn({ unique: true })
    @Generated("uuid") id: string;

    @Column ({type:'text'})
    body:string

    @ManyToOne(()=>User)
    @JoinColumn()
    user:User

    @ManyToOne(()=>Article)
    @JoinColumn()
    article:Article


}