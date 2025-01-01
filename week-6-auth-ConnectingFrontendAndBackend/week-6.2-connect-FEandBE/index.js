const express = require("express")
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECERET = "ilovemyLOveBAby"

let users = [];

app.use(express.json()); // to parse the payload into string object

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (users.find((user) => user.username === username)) return res.json({ msg: "User already exits" })

    users.push({
        username: username,
        password: password,
    })

    res.json({ msg: "you are signed Up!" })
})

app.post('/singin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userFound = users.find((user) => user.username === username && user.password === password);

    if (userFound) {
        const token = jwt.sign(userFound.username, JWT_SECERET);
        // userFound.token = token
        res.json({ token: token });
    } else {
        return res.json({ msg: "your account does not exists" });
    }
})

app.get("/me", (req, res) => {
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token, JWT_SECERET); //{username : "aliabas"}
    const username = decodedInfo.username;

    const userFound = users.find((user) => user.username === username);


    if (userFound) {
        res.json({
            username: userFound.username,
            password: userFound.password,
        })
    } else {
        res.json({ msg: "Invalid token" })
    }
})