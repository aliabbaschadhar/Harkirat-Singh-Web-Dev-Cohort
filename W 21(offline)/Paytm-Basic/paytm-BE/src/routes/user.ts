import express, { Request, Response, Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../db/schema";

const userRouter = Router();
const JWT_SECRET = process.env.SECRET;

userRouter.post("/signup", async (req: Request, res: Response) => {
    const requiredBody = z.object({
        username: z.string().email(),
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
        if (userFound?._id) {
            console.log("user Found")
            res.status(411).json({
                msg: "User already exists,signIn",
                userId: userFound._id
            })
            // return;
        }

        console.log("Attempting to create user with:", { username, firstName, lastName });

        const user = await userModel.create({
            username,
            password: hashedPassword,
            lastName,
            firstName
        })

        console.log("User creation result:", user);

        if (user) {
            console.log("User created successfully, generating token");
            const userId = user._id;
            const token = jwt.sign({
                userId
            }, JWT_SECRET as string);

            console.log("Sending response with token");
            res.status(201).json({
                userId: userId,
                msg: "User signed up ",
                token: token
            });
        } else {
            console.log("User object is falsy after creation");
            res.status(500).json({
                msg: "Error creating user - no error thrown but user not created"
            });
        }
    } catch (error) {
        console.error("Error occurred during signup:", error);
        res.status(403).json({
            error: error,
            msg: "Error occurred while signing up"
        })
    }

})

userRouter.post("/signin", async (req: Request, res: Response) => {
    // zod
    const requiredBody = z.object({
        username: z.string().email(),
        password: z.string().min(3).max(80),
    })

    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {
        res.json({
            msg: "Incorrect format",
            error: parsedData.error,
        })
        return;
    }

    // main logic
    const { username, password } = req.body;

    const user = await userModel.findOne({
        username: username
    })
    if (!user) {
        res.status(404).send({
            msg: "User doesn't exist in our DB"
        })
        return;
    }

    const matchedPassword = bcrypt.compare(
        password, user.password
    );

    if (!matchedPassword) {
        res.status(403).send({
            msg: "Incorrect password"
        })
    }

    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined!");
    }
    try {
        const token = jwt.sign({ id: user._id }, JWT_SECRET); // sign the jwt token
        res.json({
            msg: "User is signIn",
            token: token
        })
    } catch (error) {
        res.status(403).send({
            msg: "Incorrect credential",
        })
    }
});

export {
    userRouter
}