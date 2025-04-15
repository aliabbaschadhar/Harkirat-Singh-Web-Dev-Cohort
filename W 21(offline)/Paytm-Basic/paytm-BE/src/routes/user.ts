import { Request, Response, Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../db/schema";
import { configDotenv } from "dotenv";
import { userMiddleware } from "../auth/userMiddleware";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

configDotenv();

const userRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET;

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
            }, JWT_SECRET as string); // In the decoded object we will see the userId property

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
        const token = jwt.sign({ userId: user._id }, JWT_SECRET); // Changed id to userId to match declaration
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

userRouter.put("/", userMiddleware, async (req: Request, res: Response) => {

    const updateBody = z.object({
        password: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
    })

    const { success } = updateBody.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            msg: "Error while updating information"
        })
    }

    const updatedUser = await userModel.findByIdAndUpdate(
        { _id: req.userId }, req.body, { new: true, runValidators: true }
    )

    res.status(200).json({
        msg: "updated sucessfully",
        updatedUser: updatedUser
    })

    // try {

    //     const { password, firstName, lastName } = req.body;

    //     const userId = req.userId;

    //     const updatedUser = await userModel.findOneAndUpdate(
    //         { _id: userId },
    //         {
    //             $set: {
    //                 password: password,
    //                 firstName: firstName,
    //                 lastName: lastName
    //             }
    //         },
    //         {
    //             new: true,
    //             runValidators: true
    //         }
    //     );

    //     res.send(200).json({
    //         msg: "Content udpated successfully",
    //         updatedUser: updatedUser
    //     })
    // } catch (error) {
    //     res.status(411).json({
    //         msg: "Error while updating information"
    //     })
    // }

})

userRouter.get("/bulk", userMiddleware, async (req: Request, res: Response) => {
    const filter = req.query.filter || "";

    const users = await userModel.find({
        // Either the firstName should contain filter or the lastName it will show the user
        $or: [
            {
                firstName: {
                    "$regex": filter,
                }
            },
            {
                lastName: {
                    "$regex": filter,
                }
            }
        ]
    })

    res.json({
        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

export {
    userRouter
}