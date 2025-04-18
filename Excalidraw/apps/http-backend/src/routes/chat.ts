import { Router } from "express";
import { middleware } from "../middleware/middleware";
import { prismaClient } from "@repo/db/client";

const chatRouter: Router = Router();

chatRouter.get("/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId);

    const messages = await prismaClient.chat.findMany({
        where: {
            roomId: roomId
        },
        orderBy: {
            id: "desc" // take the recent ones
        },
        take: 50 //limit:50 take the 50 only
    })

    res.status(200).json({
        messages: messages
    })
})


export {
    chatRouter
}