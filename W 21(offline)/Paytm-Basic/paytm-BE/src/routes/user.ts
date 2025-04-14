import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../db/schema";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const requiredBody = z.object({
        username: z.string().trim().toLowerCase().min(3).max(30),
        password: z.string().min(6),
        firstName: z.string().trim().max(50),
        lastName: z.string().trim().max(50),
    })

    const parsedBody = requiredBody.safeParse(req.body);

    if (!parsedBody.success) {
        res.json({
            error: parsedBody.error,
            msg: "Incorrect format",
        })
        return;
    }

    try {
        const { username, password, lastName, firstName } = req.body;

        const user = await userModel.create({
            username,
            password,
            lastName,
            firstName
        })

        if (user) {
            res.json({
                userId: user._id,
                msg: "User signed "
            })
        }
    } catch (error) {
        res.json({
            error: error,
            msg: "Error occured while signing up"
        })
    }

})


export { userRouter };