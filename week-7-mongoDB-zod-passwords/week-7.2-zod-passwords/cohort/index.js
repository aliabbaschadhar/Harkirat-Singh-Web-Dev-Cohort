const bcrypt = require("bcrypt");
const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { z } = require("zod");

mongoose.connect("");

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
    //Zod schema for body
    const requiredBody = z.object({
        email: z.string().min(6).max(20).email(),
        password: z.string().min(5).max(30).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,30}$/),
        name: z.string().min(3).max(20),
    })

    // const parsedData = requiredBody.parse(req.body) // either gives you data or throw an error so that we need use tryCatch block if we wanna to use parse().
    const parseDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parseDataWithSuccess.success) {
        res.json({
            msg: "Incorrect format",
            error: parseDataWithSuccess.error
        })
        return;
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    try {

        const hashedPassword = await bcrypt.hash(password, 5); // await is due to no. of salts round which are 5 here and salt rounds are working asyncronously 
        //If we don't use the 5(salt-rounds) then we don't need to write await
        // const hashedPassword = bcrypt.hash(password);

        await UserModel.create({
            email: email,
            // password:password,
            password: hashedPassword, //using the hashed password instead of simple password
            name: name
        });

        res.json({
            message: "You are signed up"
        })
    } catch (error) {
        res.json({
            msg: "you entered the mail again",
            // error: error.errorResponse.errmsg,
        })
        // console.log(error.errorResponse.errmsg)
    }
});


app.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email, // Now we will find user with email bcz email is unique.
        // password: password,
    }); //===> Will return an object 

    if (!response) {
        res.status(403).json({
            msg: "User does not exist in our DB",
        })
        return;
    }

    //As we know that the hashed password is stored in the database and salt also both are injected in the form of a single string so

    //Now we need to compare our password with the hashed password in database. If the library folk never give the function to do then what would we do?

    //We would get the user's password and hash it again using the previous salt which was used in the first step to hash the password

    //  then we ll compare it but the library folks have given a simple function to do so.

    const passwordMatch = await bcrypt.compare(password, response.password); // Comparing the simple password with the password present in the response object came from database.

    if (passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.post("/todo", auth, async function (req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function (req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});

app.listen(3000, () => {
    console.log("Server started on 3000");
});