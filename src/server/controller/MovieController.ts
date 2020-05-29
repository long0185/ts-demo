import "reflect-metadata";
import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Movie } from "../entity/Movie"
import { plainToClass } from "class-transformer";
export class MovieController {

    private movieRepository = getRepository(Movie);

    async all(request: Request, response: Response) {
        return this.movieRepository.find();
    }
    async FindMoiveByCondition(condition: any, request: Request, response: Response) {
        let key = condition.key || "";
        let limit = condition.limit || 10;
        let page = condition.page || 1;
        let total;
        let result = await this.movieRepository.find({ name: key });
        total = result.length
        result = result.splice((page - 1) * limit, limit)
        return {
            err: '',
            data: result,
            total
        }
        
    }
    async update(request:Request,response:Response){
        const movie = await this.movieRepository.findOne(request.params.id)
      return  this.movieRepository.update(movie!,request.body)
    }
    async one(request: Request, response: Response) {
        return this.movieRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response) {
        let m = Movie.transform(request.body);
        if(request.body.id){
            return "不能设置 ID"
        }
        m = plainToClass(Movie, m)
        const result = await m.validatorThis()
        if (result.length > 1) {
            return result
        }
        return this.movieRepository.save(m);
    }

    async remove(request: Request, response: Response) {
        console.log(request.params.id)
        let userToRemove = await this.movieRepository.findOne(request.params.id);
       return await this.movieRepository.remove(userToRemove!);
    }

}