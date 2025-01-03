const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");

mongoose.connect("");
const app = express();

app.use(express.json()); // because we are parsing the body

app.post("/signup", async (req, res) => {
    const email = req.body.email
    const { password } = req.body; // different syntax
    const name = req.body.name;

    //Using await because it making a transaction to database and so that transaction will take time so 
    await UserModel.create({
        email: email,
        password: password,
        name: name,
    })

    res.json({
        msg: "You are logged in",
    })
})

app.post("/signin", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await UserModel.findOne({
            email: email,
            password: password,
        })

        console.log(user)

        if (user) {
            const token = jwt.sign({
                id: user._id,
            }, JWT_SECRET);
            res.json({
                token: token,
                msg: "You are logged In",
                id: user._id
            })
        }
    } catch (error) {
        console.log(error);
        res.status(403).send({
            msg: "Incorrect credentials!",
        })
    }

})

app.post("/todo", auth, async (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        title,
        userId,
        done,
    })
    res.json({ msg: "Todo created!" });

})

app.get("/todos", auth, async (req, res) => {
    const userId = req.userId;

    const todos = await TodoModel.find({ userId })
    res.json({ todos });
})

app.listen(3000, () => {
    console.log("Server running on 3000 port");
})
