import { Router } from "express";
import { userRouter } from "./user";
import { roomRouter } from "./room";


const rootRouter: Router = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/room", roomRouter);

export {
    rootRouter
}