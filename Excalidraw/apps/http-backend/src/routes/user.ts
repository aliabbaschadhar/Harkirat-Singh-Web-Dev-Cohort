import { Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";

configDotenv();

const JWT_SECRET = process.env.JWT_SECRET;

const userRouter: Router = Router();

userRouter.post("/signup", async (req, res) => {

    const requiredBody = z.object({
        username: z.string().email(),
        password: z.string().min(3).max(20)
    })

    const { success, error } = requiredBody.safeParse(req.body);

    if (!success) {
        res.status(403).json({
            msg: "Invalid format",
            error: error
        })
        return;
    }

    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 5);

        //Check user already exits or not
        // db call

        if (!JWT_SECRET) {
            res.json({
                msg: "JWT_SECRET is undefined"
            })
            return;
        }
        // const token = jwt.sign({
        //     userId
        // },JWT_SECRET)

        res.status(201).json({
            msg: "User signed up",
            // token:token
        })
    } catch (error) {
        res.status(404).json({
            error
        })
    }
})


userRouter.post("/signin", async (req, res) => {
    const requiredBody = z.object({
        username: z.string().email(),
        password: z.string(),
    })
    const { success, error } = requiredBody.safeParse(req.body);


    if (!success) {
        res.status(403).json({
            msg: "Invalid format",
            error: error
        })
        return;
    }

    try {
        const { username, password } = req.body;

        // const comparePassword = await bcrypt.compare(password,user.password)

        //Make db call 

        if (!JWT_SECRET) {
            res.json({
                msg: "JWT_SECRET is undefined"
            })
            return;
        }


        // jwt.sign({
        //     usrId
        // },JWT_SECRET)
    } catch (error) {
        res.status(404).json({
            error
        })
    }
})


export { userRouter };