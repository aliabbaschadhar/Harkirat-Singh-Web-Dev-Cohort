const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const { UserModel, TodoModel } = require("./db");
const { JWT_SECRET, auth } = require("./auth");

mongoose.connect("")

const app = express();
app.use(express.json()); // for parsing body

app.post("/signup", async (req, res) => {
    try {

        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;

        await UserModel.create({
            email: email,
            name: name,
            password: password
        })
        res.json({
            msg: "You are logged in"
        })
    } catch (error) {
        res.status(403).send({
            msg: "Incorrect credentials!"
        })
    }
})

app.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
        password: password,
    })

    if (user) {
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.json({
            token: token,
            msg: "You are signed IN!!",
        })
    } else {
        res.status(403).send({
            msg: "Incorrect credentials!",
        })
    }
})

app.post("/todo", auth, async (req, res) => {
    const { title } = req.body;
    const userId = req.userId;
    const done = req.body.done;

    await TodoModel.create({
        title,
        userId,
        done,
    })

    res.json("Todo is created")

})

app.get("/todos", auth, async (req, res) => {
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId,
    })
    res.json({
        todos
    })
})

app.listen(3000, () => {
    console.log("Sever running on 3000");
})