import Express,{Response,Request} from "express"
import {MallController} from "../controller/MallController"
const router = Express.Router()

router.get("/all",async (req:Request,res:Response)=>{
    const result = await new MallController().all(req,res)
    console.log(result)
    res.send(result)
})
router.get("/",async (req:Request,res:Response)=>{
    
   try{
    const result = await new MallController().searchByCondition(req,res)
    console.log(result)
    res.send(result)
   }catch{
    res.send({err:"find err"})
   }

 })
router.post("/",async (req:Request,res:Response)=>{
    const result = await new MallController().save(req,res)
    if(result){
        res.send({status:"200",msg:result})
    }else{
        res.send({status:"404",msg:"save fail"})
    }
  
})
export default router