import { z } from "zod";
import express from "express";

const app = express();

// Define schema for profile update

const userProfileUpdateSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    email: z.string().email({ message: "Invalid email format" }),
    age: z.number().min(18, { message: "You must be at least 18 years old" }).optional()
})

// Infer the type from the schema
type userProfileUpdate = z.infer<typeof userProfileUpdateSchema>;

app.put("/user", (req, res) => {
    const { success } = userProfileUpdateSchema.safeParse(req.body);
    // const updateBody = (req.body) // How to assign type of updatedBody
    const updateBody: userProfileUpdate = req.body;

    if (!success) {
        res.status(411).json({});
        return;
    }

    // update the database here
    res.json({
        msg: "User updated"
    })
})

app.listen(3000);