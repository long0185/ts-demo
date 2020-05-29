import { Response } from "express";
interface ISearchResult<T>{
    count:number,
    data:T[],
    errors:string[]
}
export class ResponseHelper {
    static sendError(error: string | string[],res:Response) {
        let err: string;
        if (Array.isArray(error)) {
            err = error.join(";")
        } else {
            err = error
        }
        res.send({
            status:"1",
            msg:err,
        })
    };
    static sendData(data:any=null,res:Response){
        res.send({
            err:"",
            data
        })
    }
    static sendPageData<T>(result:ISearchResult<T>,res:Response){
        if(result.errors.length>0){
            this.sendError(result.errors,res)
        }else{
            res.send({
                err:"",
                data:result.data,
                total:result.count
            })
        }
    }   

}