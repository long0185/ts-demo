import { IsNotEmpty, IsInt, Min, Max, validate } from "class-validator";
import { Type, plainToClass } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    private id?: number;

    @Column({type:"char",length:255})
    @IsNotEmpty({ message: "电影名称不能为空" })
    @Type(() => String)
    public name?: string;

    @Column({type:"char",length:255})
    @IsNotEmpty({ message: "电影类型不能为空" })
    @Type(() => String)
    public types?: string;

    @Column({type:"char",length:255})
    @IsNotEmpty({ message: "电影地区不能为空" })
    @Type(() => String)
    public areas?: string;

    @Column({type:"boolean"})
    @IsNotEmpty({ message: "是否经典不能为空" })
    @Type(() => Boolean)
    public isClassic: boolean = true;

    @Column({type:"int"})
    @IsNotEmpty({ message: "电影时长不能为空" })
    @IsInt({ message: "时长必须为整数" })
    @Min(1, { message: "时长最少一分钟" })
    @Max(9999, { message: "时长过长" })
    @Type(() => Number)
    public timeLong?: number;

    @Column({type:"boolean"})
    @IsNotEmpty({ message: "是否热映不能为空" })
    @Type(() => Boolean)
    public isHot: boolean = true;

    @Column({type:"char",length:255})
    public poster?: string;

    public async validatorThis(): Promise<string[]> {
        const errs = await validate(this)
        const temp = errs.map(e => Object.values(e.constraints!))
        let result: string[] = []
        temp.forEach(e => {
            result.push(...e)
        })
        return result
    }
    public static transform(obj: object): Movie {
        if (obj instanceof Movie) {
            return obj
        } else {
            return plainToClass(Movie, obj)
        }
    }
}
