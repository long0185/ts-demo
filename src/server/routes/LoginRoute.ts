import Express, { Request, Response } from "express"
import { LoginController } from "../controller/LoginController"
import { ResponseHelper } from "../Utils/ResponseHelper"
const router = Express.Router()
router.post("/",async (req:Request,res:Response)=>{
    try{
        const result = await new LoginController().one(req,res) 
        if(result.length==0){
            ResponseHelper.sendError("用户密码不正确", res)
        }else{
            ResponseHelper.sendData(result,res)

        }
    }catch{
        ResponseHelper.sendError("用户密码不正确", res)
    }
})
router.post("/add",async (req:Request,res:Response)=>{
    try{
        const result = await new LoginController().add(req,res)  
        ResponseHelper.sendData("ok",res) 
    }catch{
        ResponseHelper.sendError("add fial error", res)
    }
})
router.put("/update",async (req:Request,res:Response)=>{
    try{
        const result = await new LoginController().update(req,res)  
        ResponseHelper.sendData(result,res) 
    }catch{
        ResponseHelper.sendError("update fial error", res)
    }
})
export default router;