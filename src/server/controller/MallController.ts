import "reflect-metadata";
import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Mall } from "../entity/Mall"
import { plainToClass } from "class-transformer";
import { TransformPlainToClass } from "class-transformer"
export class MallController {

    private mallRepository = getRepository(Mall);

    async all(request: Request, response: Response) {
        return this.mallRepository.find();
    }
    async save(request: Request, response: Response) {
        const m = request.body
        const mall = plainToClass(Mall, m)
        return await this.mallRepository.save(mall)
    }
    async searchByCondition(request: Request, response: Response) {
        const condition = request.query
        let key = condition.key as string;
        let limit = +condition.limit!;
        let page = +condition.page!;
        let result = key ? await this.mallRepository.find({ category: key }) : await this.mallRepository.find()
        let total = result.length
        if (page) { result = result.splice((page - 1) * limit, limit) }
        else {
            result = result
        }
        return {
            err: '',
            data: result,
            total
        }

    }

    async remove(request: Request, response: Response) {
        let userToRemove = await this.mallRepository.findOne(request.params.id);
        return await this.mallRepository.remove(userToRemove!);
    }

}