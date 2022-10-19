import { Entity ,PrimaryColumn,Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";

@Entity('articles')
export class Article {
    @PrimaryColumn( {length:30})
    slug:string

    @Column ( {length:30})
    title:string

    @Column ({length:100,nullable:true})
    description?:string

    @Column ({type:'text'})
    body:string
   
    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date

    @ManyToOne(()=>User)
    @JoinColumn()
    author:User
    @JoinColumn()
    comments:Article
}