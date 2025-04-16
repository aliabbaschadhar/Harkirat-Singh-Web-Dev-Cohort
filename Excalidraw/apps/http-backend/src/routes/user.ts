import { Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "@repo/backend-common/config"
import { CreateUserSchema, SigninSchema } from "@repo/common/types";

const userRouter: Router = Router();

userRouter.post("/signup", async (req, res) => {



    const { success, error } = CreateUserSchema.safeParse(req.body);

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

    const { success, error } = SigninSchema.safeParse(req.body);


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