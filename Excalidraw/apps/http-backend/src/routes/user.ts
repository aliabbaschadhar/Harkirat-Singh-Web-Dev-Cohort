import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "@repo/backend-common/config"
import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client"


const userRouter: Router = Router();

userRouter.post("/signup", async (req, res) => {

    const parsedBody = CreateUserSchema.safeParse(req.body);

    if (!parsedBody.success) {
        res.status(403).json({
            msg: "Invalid format",
            error: parsedBody.error
        })
        return;
    }

    const { email, name, password } = parsedBody.data;

    try {

        const hashedPassword = await bcrypt.hash(password, 5);

        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })

        if (existingUser) {
            res.status(409).json({
                msg: "User already exists signIn ",
                existingUser
            })
            return;
        }

        const user = await prismaClient.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        })

        if (!JWT_SECRET) {
            res.json({
                msg: "JWT_SECRET is undefined"
            })
            return;
        }

        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET)

        res.status(201).json({
            msg: "User signed up",
            token: token,
            userId: user.id
        })
    } catch (error) {
        res.status(404).json({
            error
        })
    }
})


userRouter.post("/signin", async (req, res) => {

    const parsedBody = SigninSchema.safeParse(req.body);


    if (!parsedBody.success) {
        res.status(403).json({
            msg: "Invalid format",
            error: parsedBody.error
        })
        return;
    }

    try {
        const { email, password } = parsedBody.data;

        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })

        if (!existingUser) {
            res.status(404).json({
                msg: "User not found signup"
            })
            return;
        }

        const comparePassword = await bcrypt.compare(password, existingUser.password)

        if (!comparePassword) {
            res.status(404).json({
                msg: "Password incorrect"
            })
            return;
        }

        if (!JWT_SECRET) {
            res.json({
                msg: "JWT_SECRET is undefined"
            })
            return;
        }

        const token = jwt.sign({
            usrId: existingUser.id
        }, JWT_SECRET)

        res.status(201).json({
            msg: "User signed up",
            token: token,
        })

    } catch (error) {
        res.status(404).json({
            error
        })
    }
})


export { userRouter };