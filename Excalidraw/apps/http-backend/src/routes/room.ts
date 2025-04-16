import { Router } from "express";
import { middleware } from "../middleware/middleware";

const roomRouter: Router = Router();

roomRouter.post("/", middleware, (req, res) => {
    //db call

    res.json({
        roomId: 123
    })
})



export {
    roomRouter
}