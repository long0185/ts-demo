import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"
@Entity()
export class User{
    @PrimaryGeneratedColumn()
     id?: number;

    @Column()
     username?:string

    @Column()
     password?:string

    @Column()
     create_time?:string

    @Column()
     _v:number=0;

    @Column()
     role?:'admin'|'user'|"guest"

}