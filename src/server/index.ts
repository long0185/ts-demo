import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { NextFunction } from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import router from "./routes/MovieRoute"
import UploadRouter from "./routes/UploadRoute"
import LoginRouter from "./routes/LoginRoute"
import MallRouter from "./routes/MallRoute"
import { Movie } from "./entity/Movie";
import { MovieController } from "./controller/MovieController";
import history from "connect-history-api-fallback"


createConnection().then(async connection => {

    const app = express();
    app.use(history())
    app.use(bodyParser.json())
    app.use("/",express.static("public/build"))
    app.use("/upload",express.static("public/upload"))
   app.use("/api/movie",router)
   app.use("/api/upload",UploadRouter)
   app.use("/api/login",LoginRouter)
   app.use("/api/mall",MallRouter)
    app.listen(3000);
    console.log("服务器连接成功,run port:3000");

}).then(resp=>console.log("连接数据库成功")).catch(error => console.log(error));