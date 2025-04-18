import { Router } from "express";
import { userRouter } from "./user";
import { roomRouter } from "./room";
import { chatRouter } from "./chat"


const rootRouter: Router = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/room", roomRouter);
rootRouter.use("/chats", chatRouter);

export {
    rootRouter
}