import express, { Router } from "express"
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { userModel } from "../db/db";
import dotenv from "dotenv";

dotenv.config();// Load the environment variables

const SECRET = process.env.JWT_SECRET;

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    //zod ==> Input validation on runtime
    const requiredBody = z.object({
        username: z.string().min(4).optional(),
        password: z.string().min(8).max(30),
        // This regular expression enforces the following rules on the password:
        // 1. At least one uppercase letter: (?=.*[A-Z])
        // 2. At least one lowercase letter: (?=.*[a-z])
        // 3. At least one digit: (?=.*\d)
        // 4. At least 8 characters long: .{8,}
        email: z.string().min(8).email(),
    })

    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {

        res.json({
            msg: "Incorrect format",
            error: parsedData.error,
        })
        return
    }

    // Main logic

    const { username, password, email } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
        res.status(403).send({ msg: "User already exist, Please Signin!!" })
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    try {
        await userModel.create({
            username: username,
            password: hashedPassword,
            email: email,
        })
        res.json({
            msg: "You are signed up at user endpoint"
        })
    } catch (error) {
        res.status(403).send({
            msg: "Some error occured!",
            error: error
        })
    }
})

userRouter.post("/signin", async (req, res) => {
    // zod
    const requiredBody = z.object({
        email: z.string().email(),
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

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email
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

    if (!SECRET) {
        throw new Error("JWT_SECRET is not defined!");
    } // If i will not check that JWT_SECRET is undefined or not
    // Then jwt will not sign the token bcz process.env.JWT_SECRET can be undefined or string
    // And jwt.sing() only accepts string that's why we first need to check the type jwt secret then we will proceed next.

    try {
        const token = jwt.sign({ id: user._id }, SECRET); // sign the jwt token
        res.json({
            msg: "User is signIn",
            token: token
        })
    } catch (error) {
        res.status(403).send({
            msg: "Incorrect credential",
        })
    }
})

export { userRouter }