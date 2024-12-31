const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "iloveyoutoo"

const users = [];

// function generateToken() {
//     const options = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//     let token = "";
//     for (let i = 0; i < 32; i++) {
//         token += options[Math.floor(Math.random() * options.length)];
//     }
//     return token;
// }

app.use(express.json());

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find((user) => user.username === username);

    if (foundUser) return;

    users.push({
        username: username,
        password: password,
    })
    res.json({ msg: " You are now part of our family. Welcome!" })
    console.log(users)
})

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = users.find((user) => user.username === username && user.password === password);

    if (foundUser) {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET)
        foundUser.token = token;
        res.status(200).send({ token: token })
    } else {
        res.status(403).send({ msg: "You are not signed in! Sign Now!!!" });
    }
    console.log(users);
})

app.get("/me", (req, res) => {
    const token = req.headers.token;
    const userDetails = jwt.verify(token, JWT_SECRET);
    const username = userDetails.username;

    const foundUser = users.find((user) => user.token === token);
    if (foundUser) {
        res.send({
            username: foundUser.username,
            password: foundUser.password,
        })
    } else {
        res.status(401).send({
            msg: "you are unauthorized!!!"
        })
    }
})

app.listen(3000, () => {
    console.log("Server running on 3000");
})