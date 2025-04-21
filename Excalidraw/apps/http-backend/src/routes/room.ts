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
    } else {
        console.log("Format is correct")
    }

    const { slug } = parsedBody.data
    const userId = req.userId;

    // Verify userId is present
    if (!userId) {
        res.status(403).json({
            msg: "Authentication failed: User ID not found in token",
        });
        return;
    }

    try {

        const existingRoom = await prismaClient.room.findFirst({
            where: {
                slug: slug
            }
        })

        if (existingRoom) {
            res.json({
                msg: "Room already exists name should be unique"
            })
            return;
        }
        const createdRoom = await prismaClient.room.create({
            data: {
                slug,
                adminId: userId
            }
        })

        console.log('Room created successfully')

        res.status(201).json({
            roomId: createdRoom.id,
            createdBy: createdRoom.adminId
        })
    } catch (error) {
        console.error("Room creation error:", error);
        res.status(403).json({
            error: error
        })
    }
})

roomRouter.get("/:slug", async (req, res) => {
    const slug = req.params.slug;

    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    })

    if (room) {
        res.json({
            room
        })
    } else {
        res.json({
            msg: "Room not found"
        })
    }
})

export {
    roomRouter
}