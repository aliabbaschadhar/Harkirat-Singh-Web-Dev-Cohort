import { z } from "zod";
import jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response, Router } from "express";
import { userMiddleware } from "../middlewares/middleware";
import { contentModel } from "../db/db";

const contentRouter = Router();



contentRouter.get("/", userMiddleware, async (req, res) => {

    const userId = req.userId;

    const content = await contentModel.find({
        userId: userId,
    }).populate("userId", "username")

    // Find the content of specific user and populate the userId field so that i can use the user's username on the frontend and we can also access the users password,email etc if we want to, like

    // .populate("userId", "username password email")

    res.json({
        content: content
    })
})


contentRouter.post("/", userMiddleware, async (req: Request, res: Response) => {
    const requiredBody = z.object({
        link: z.string().url(),
        title: z.string().optional(),
        cType: z.enum(["image", "video", "article", "audio"]),
        tags: z.array(z.string()).optional(),
    })

    /**
     * To send a request in postman, use the following json format:
     * {
     *     "link": "https://example.com",
     *     "title": "Example Title",
     *     "cType": "image",
     *     "tags": ["tag1", "tag2"]
     * }
     */

    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {
        res.json({
            msg: "Incorrect format",
            error: parsedData.error,
        })
        return;
    }

    try {
        const { link, title, tags, cType } = req.body
        const content = await contentModel.create({
            title,
            link,
            cType,
            // No error here bcz of the override.d.ts file Request is extended with userId
            userId: req.userId,

            // If tags is not provided in the request body, set it to an empty array
            // tags: tags ? tags : []
            tags: tags || []
        })
        res.json({
            msg: "Content added!",
            content
        })

    } catch (error) {
        res.status(500).json({
            msg: "Failed to add content",
            error: (error as Error).message
        })
    }
})


contentRouter.delete("/", userMiddleware, async (req, res) => {
    const { contentId } = req.body;

    await contentModel.deleteMany({
        contentId,
        userId: req.userId, // To make sure that the content is owned by the user
    })

    res.json({
        msg: "Content deleted!"
    })
})

// contentRouter.put("/",(req,res)=>{})

export { contentRouter }