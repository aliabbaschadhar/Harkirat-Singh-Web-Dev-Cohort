const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = 'paypalMafia';
const users = [];

//should return random token string

// function generateToken() {
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
//     let token = "";
//     for (let i = 0; i < 32; i++) {
//         token += options[Math.floor(Math.random() * options.length)]; // 0 ==> 42 | Math.floor(Math.random() * options.length)
//     }
//     return token;
// }

// Now we don't need to create my own tokens we can use jsonwebtoken
// Why are we replacing the generated tokens with JWTs?
// Because JWTs are more secure than tokens & generated tokens are stateful 
// we mean that we need to store these tokens in a variable right now.
//The problem is that we need to send a request to the database every time the user wants to hit an authenticated endpoint
// By using JWTs we don't need to make another trip to database to authenticate user


//JWTs ===> JSON Web Tokens takes the users username and encrypts/encode it with a secret key into a token
// It's a string that looks like a random string but it's not a random string it's encrypted with a secret key 
// when the again needed to authenticate the server decrypt the created token to check the user is authenticated or not.




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
        // const generatedToken = generateToken(); // Coverting it into JWT
        const token = jwt.sign({
            username: username
        }, JWT_SECRET) // Convert their username into jwt
        // user.push({token : generatedToken}) // Adding another object in the user object
        // userFound.token = token;  // So i am not gonna store the token in the variable or database bcz jwt tokens are stateless and store their state itself 
        res.status(200).send({ token: token });
    } else {
        res.status(403).send({ msg: "Your username or password is incorrect" });
    }
    console.log(users);
});

// To get my own data
app.get("/me", (req, res) => {
    const token = req.headers.token; // Token will be send in the header but now it will be jwt
    const decodedInfo = jwt.verify(token, JWT_SECRET) // Converting the JWT into the username to verify that the user exits or not
    const username = decodedInfo.username;
    const userFound = users.find((user) => user.username === username);
    if (userFound) {
        res.json({ username: userFound.username, password: userFound.password });
    } else {
        res.status(403).send({ msg: "Your token is invalid" });
    }
});

app.listen(3000, () => console.log('Server started on port 3000'));
