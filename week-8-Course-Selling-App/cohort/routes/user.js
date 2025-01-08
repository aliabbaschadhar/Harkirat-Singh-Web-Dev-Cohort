// const express = require("express")
// const Router = express.Router; // 1
const { Router } = require("express"); //2
const { userModel } = require("../db");
//Both 1 and 2 are doing same thing

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const zod = require("zod");

const userRouter = Router(); //Router is a function not a class
// If  we console.log(userRouter) then
//{
// params: { },
// _params: [],
//     caseSensitive: false,
//         mergeParams: undefined,
//             strict: false,
//                 stack: []
// }

// params: An object that holds parameters for the router.
// _params: An array that holds parameter callbacks.

// caseSensitive: A boolean indicating whether the router is case -sensitive(default is false).

// mergeParams: A boolean or undefined indicating whether to merge parent and child route parameters.

// strict: A boolean indicating whether the router is strict about trailing slashes(default is false).

// stack: An array that holds the middleware and route handlers added to the router.

userRouter.post('/signup', async (req, res) => {
    //zod
    const requiredBody = zod.object({
        email: zod.string().min(8).max(30).email(),
        password: zod.string().min(8).max(30).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        firstName: zod.string().min(3).max(8),
    })
    const parsedData = requiredBody.safeParse(req.body);
    if (!parsedData.success) {
        return res.json({
            msg: "Inocorrect format!",
            error: parsedData.error
        })
    }

    //Main logic

    const { email, password, firstName, lastName } = req.body;

    const user = await userModel.findOne({ email: email });
    if (user) return res.status(403).send({ msg: "User already exists" })

    const hashedPassword = await bcrypt.hash(password, 5);

    try {
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.json({ msg: "You are signed up at user endpoint" });
    } catch (error) {
        res.status(403).send({
            msg: "Some error occured!",
            error: error
        })
    }
})


userRouter.post("/signin", async (req, res) => {
    //zod
    const requiredBody = zod.object({
        email: zod.string().min(8).max(30).email(),
        password: zod.string().max(30).min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/), // This regex says that the password should have at least one uppercase letter, one lowercase letter and one number. It should also have a minimum length of 8 and a maximum length of 30.
    })
    const parsedData = requiredBody.safeParse(req.body);
    if (!parsedData.success) {
        return res.json({
            msg: "Inocorrect format!",
            error: parsedData.error
        })
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email
    })
    if (!user) {
        return res.status(404).send({ msg: "User doesn't exist in our DB" });
    }
    const matchedPassword = bcrypt.compare(password, user.password);

    if (!matchedPassword) {
        return res.status(403).send({ msg: "Incorrect password" });
    }
    console.log(process.env.JWT_USER_SECRET);

    try {
        const token = jwt.sign({
            password: password
        },
            process.env.JWT_USER_SECRET);
        return res.status(200).send({
            token: token
        });
    } catch (error) {
        res.status(404).send({
            msg: "Error occured",
        });
        console.log(error);
        return;
    }
})


userRouter.get("/purchases", (req, res) => {
    res.json({ msg: "To see all the purchased courses" })
})


module.exports = {
    userRouter: userRouter
}
