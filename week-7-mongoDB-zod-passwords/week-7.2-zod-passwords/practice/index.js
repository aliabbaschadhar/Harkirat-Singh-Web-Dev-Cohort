const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { userModel, todoModel } = require("./db");
const { auth } = require("../practice/auth");

const app = express();
app.use(express()); // for body parsing

app.post("/signup", async (req, res) => {
    const requiredBody = zod.object({
        email: zod.string().min(6).max(30).email(),
        name: zod.string().min(3).max(20),
        password: zod.string().min(8).max(20).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/),
    })
    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {
        res.json({
            msg: "Incorrect format",
            error: parsedData.error
        })
        return;
    }

    const { name, email, password } = req.body
    //Checking does the user already exists or not
    const user = userModel.findOne({ email: email });
    if (user) {
        res.json({ msg: "you already exit,try to signin" })
        return;
    }

    try {
        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 5);
        //Storing the hashedPassword in the database
        await userModel.create({
            email: email,
            password: hashedPassword,
            name: name
        })
        res.json({
            msg: "You are signed up!"
        })

    } catch (error) {
        res.json({
            msg: "You are not signed up",
            error: error
        })
    }
})

app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    const user = userModel.findOne({ email: email })

    if (!user) {
        return res.json({ msg: "User doesn't exists,first signup" })
    }

    const passwordMatch = bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.json({ msg: "Incorrect credentials!" })
    }

    try {
        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);
        return res.json({ token });
    } catch (error) {
        return console.log(error);
    }
})

app.post("/todo", auth, (req, res) => {
    const userId = req.userId;
    const { title, done } = req.body;
    todoModel.create({
        title, userId, done
    })
    res.json({ msg: "Todo created" })
})

app.get("/todos", auth, async (req, res) => {
    const userId = req.userId;
    const email = req.body.email;
    const user = await userModel.findOne({ email: email })
    if (!user) return res.json({ msg: "Incorrect credentials!" })
    const todos = todoModel.find({ userId: user._id });
    if (todos) res.json({ todos: todos });
})



async function main() {
    await mongoose.connect(process.env.DB_CONNECTION);

    app.listen(3000, () => {
        console.log("Connection successful and server running on 3000 port");
    })
}
main();
