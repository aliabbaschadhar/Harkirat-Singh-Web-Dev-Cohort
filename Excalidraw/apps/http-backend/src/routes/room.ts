import { Router } from "express";
import { middleware } from "../middleware/middleware";
import { CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const roomRouter: Router = Router();

roomRouter.post("/", middleware, async (req, res) => {
    //db call
    const parsedBody = CreateRoomSchema.safeParse(req.body);
    if (!parsedBody.success) {
        res.json({
            msg: "Invalid format",
            error: parsedBody.error
        })
        return;
    }

    const { slug } = parsedBody.data
    const userId = req.userId;

    try {
        const createdRoom = await prismaClient.room.create({
            data: {
                slug,
                adminId: userId as string
            }
        })
        res.status(200).json({
            roomId: createdRoom.id,
            createdBy: createdRoom.adminId
        })
    } catch (error) {
        res.status(403).json({
            error: error
        })
    }
})



export {
    roomRouter
}