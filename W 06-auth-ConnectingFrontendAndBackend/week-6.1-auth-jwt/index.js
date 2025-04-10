const express = require('express');
const app = express();

const users = [];

//should return random token string
function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let token = "";
    for (let i = 0; i < 32; i++) {
        token += options[Math.floor(Math.random() * options.length)]; // 0 ==> 42 | Math.floor(Math.random() * options.length)
    }
    return token;
}
app.use(express.json());

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check does user already exists or not
    if (users.find(user => user.username === username)) {
        return res.json({ msg: "You're already signed in" });
    }

    users.push({
        username: username,
        password: password
    });
    console.log(users);
    res.json({ msg: "You are signed in!" });
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // That is the wrong implementation of find()
    // users.find((user) => {
    //   if (user.username === username && user.password === password) {
    //     const generatedToken = generateToken();
    //     // user.push({ token: generatedToken }); // I'm pushing another object in the user object
    //     user.token = generatedToken;
    //     res.json({ msg: generatedToken });
    //   } else {
    //     res.status(403).send({ msg: "your username or password is wrong! " });
    //   }
    // });

    let userFound = users.find((user) => user.username === username && user.password === password);

    if (userFound) {
        const generatedToken = generateToken();
        // user.push({token : generatedToken}) // Adding another object in the user object

        userFound.token = generatedToken;//F**king js
        res.status(200).send({ token: generatedToken });
    } else {
        res.status(403).send({ msg: "Your username or password is incorrect" });
    }
    console.log(users);
});

// To get my own data
app.get("/me", (req, res) => {
    const token = req.headers.token;
    const userFound = users.find((user) => user.token === token);
    if (userFound) {
        res.json({ username: userFound.username, password: userFound.password });
    } else {
        res.status(403).send({ msg: "Your token is invalid" });
    }
});

app.listen(3000, () => console.log('Server started on port 3000'));
