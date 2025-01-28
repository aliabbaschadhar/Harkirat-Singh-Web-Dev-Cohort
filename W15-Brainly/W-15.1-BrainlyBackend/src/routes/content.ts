import { z } from "zod";
import jwt from "jsonwebtoken";
import express, { Request, Response, Router } from "express";
import { userMiddleware, CustomRequest } from "../middlewares/middleware";
import { contentModel } from "../db/db";

const contentRouter = Router();



contentRouter.get("/", (req, res) => { })


contentRouter.post("/", userMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        const { link, title, tags, cType } = req.body
        const content = await contentModel.create({
            title,
            link,
            cType,
            userId: req.userId,
            tags: tags || []
        })
        return res.json({
            msg: "Content added!",
            content
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Failed to add content",
            error: (error as Error).message
        })
    }
})


contentRouter.delete("/", (req, res) => { })

// contentRouter.put("/",(req,res)=>{})

export { contentRouter }