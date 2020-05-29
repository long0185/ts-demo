import express, { Request, Response } from "express"
const router = express.Router()
import path from "path"
import multer from "multer"
import { ResponseHelper } from "../Utils/ResponseHelper"
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, "../../../public/upload"),
    filename: function (req, file, cb) {
        const time = new Date().getTime();
        const extname = path.extname(file.originalname)
        cb(null, `${time}${extname}`)
    },

})
const allowExtensions = ['.jpg', '.png', '.jpeg', ".gif", ".webp", ".bmp", ".jiff"]
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
    fileFilter(req, file, cb) {
        const ext = path.extname(file.originalname)
        if (allowExtensions.includes(ext)) {
            cb(null, true)
        } else {
            cb(new Error("文件后缀名不正确"))
        }
    }

}).single("imgfile");
router.post("/", (req: Request, res: Response) => {
    try {
        upload(req, res, (err:any) => {
            if (err) {
                ResponseHelper.sendError(err.message, res)
            } else {
                const url = `/upload/${req.file.filename}`
                ResponseHelper.sendData(url, res)
            }
        })
    } catch{
        ResponseHelper.sendError("上传失败", res)
    }

})
export default router