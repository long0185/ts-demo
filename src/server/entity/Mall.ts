import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"
@Entity()
export class Mall{
    @PrimaryGeneratedColumn()
     id?: number;
    @Column()
     name!:string
    @Column()
    area!: string;
    @Column()
     price?:string
    @Column()
    category!: string;
    @Column()
    stock!: number;
    @Column()
    poster?: string;
    @Column()
    description?: string;
    @Column()
    link?: string;



}