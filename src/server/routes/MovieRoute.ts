import Express, { Response, Request } from "express"
import { MovieController } from "../controller/MovieController"
import { ResponseHelper } from '../Utils/ResponseHelper'
import { classToPlain } from "class-transformer"
const router = Express.Router()
router.get("/:id", async (req: Request, res: Response) => {
    try{
        const result = await new MovieController().one(req, res)
        ResponseHelper.sendData(result, res)
    }catch{
        ResponseHelper.sendError("find error", res)
    }
    
})
router.get("/", async (req: Request, res: Response) => {
    try {
        const condition = req.query;
        const result = await new MovieController().FindMoiveByCondition(condition, req, res)
        res.send(result)
    } catch{
        ResponseHelper.sendError("findByCondition error", res)
    }
})
router.post("/",async (req:Request,res:Response)=>{
    try{
        const result = await new MovieController().save(req,res)
        ResponseHelper.sendData(classToPlain(result),res)
    }catch{
        ResponseHelper.sendError("add fial error", res)
    }
})
router.put("/:id", async (req: Request, res: Response) => {
    try{
    let result = await new MovieController().update(req, res)
        return res.send({
            message:"update success"
        })
    }catch{
        ResponseHelper.sendError("update error", res)
    }

})
router.delete("/:id", async (req, res) => {
   try{
       const result = await new MovieController().remove(req,res)
       return res.send({
        message:"delete success "
    })
   }catch{
    ResponseHelper.sendError("delete error", res)
   }

})
export default router;