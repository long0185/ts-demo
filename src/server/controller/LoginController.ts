import { getRepository } from "typeorm"
import { User } from "../entity/User"
import { Request, Response } from "express";
export class LoginController {
    private loginRepository = getRepository(User)
    async one(request: Request, response: Response) {
        return this.loginRepository.find({ username: request.body.username, password: request.body.password })
    }
    async add(request: Request, response: Response) {
        const user = new User()
        user.username = request.body.username;
        user.password = request.body.password;
        user.role = request.body.role
        user.create_time = (new Date().getTime()).toString()
        return this.loginRepository.save(user)
    }
    async update(request:Request,response:Response){
        const user = await this.loginRepository.find({ username: request.body.username, password: request.body.password })
       user[0].role = request.body.role
      const resp = await this.loginRepository.save(user)
     return resp
    }
}