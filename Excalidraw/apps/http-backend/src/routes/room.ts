import { Router } from "express";
import { middleware } from "../middleware/middleware";
import { CreateRoomSchema } from "@repo/common/types";

const roomRouter: Router = Router();

roomRouter.post("/", middleware, (req, res) => {
    //db call
    const { success, error } = CreateRoomSchema.safeParse(req.body);
    if (!success) {
        res.json({
            msg: "Invalid format",
            error: error
        })
        return;
    }

    res.json({
        roomId: 123
    })
})



export {
    roomRouter
}