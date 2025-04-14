import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../db/schema";

const userRouter = Router();
const JWT_SECRET = process.env.SECRET;

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
        const hashedPassword = await bcrypt.hash(password, 5);

        //Check whether user already exists or not
        const userFound = await userModel.findOne({
            username
        })
        if (userFound) {
            res.status(411).json({
                msg: "User already exists,signIn",
                userId: userFound._id
            })
            return;
        }

        const user = await userModel.create({
            username,
            password: hashedPassword,
            lastName,
            firstName
        })

        if (user) {
            res.status(201).json({
                userId: user._id,
                msg: "User signed up ",
                token: jwt.sign(user._id, JWT_SECRET as string),
            })
        }
    } catch (error) {
        res.status(403).json({
            error: error,
            msg: "Error occured while signing up"
        })
    }

})


export { userRouter };