import { z } from "zod";
import jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response, Router } from "express";
import { userMiddleware } from "../middlewares/middleware";
import { contentModel } from "../db/db";

const contentRouter = Router();



contentRouter.get("/", (req, res) => { })


contentRouter.post("/", userMiddleware, async (req: Request, res: Response) => {
    const requiredBody = z.object({
        link: z.string().url(),
        title: z.string(),
        cType: z.enum(["image", "video", "article", "audio"]),
        tags: z.array(z.string()).optional(),
    })


    try {
        const { link, title, tags, cType } = req.body
        const content = await contentModel.create({
            title,
            link,
            cType,
            //@ts-ignore
            userId: req.userId,
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


contentRouter.delete("/", (req, res) => { })

// contentRouter.put("/",(req,res)=>{})

export { contentRouter }