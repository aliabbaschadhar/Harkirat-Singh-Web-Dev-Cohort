const express = require("express")
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ilovemyLOveBAby"

const users = [];

function loggerMiddleware(req, res, next) {
    console.log(`${req.method} request came `);
    next();
}

app.use(express.json()); // to parse the payload into string object

app.use(loggerMiddleware); // To log the no. of requests 

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html"); // Accessing my frontend and backend at the same URL
    //__dirname===> current working directory like using pwd(in terminal)
})

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

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userFound = users.find((user) => user.username === username && user.password === password);

    if (userFound) {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);
        // userFound.token = token
        res.json({ token: token });
    } else {
        return res.json({ msg: "your account does not exists" });
    }
})

//auth middleware
function authMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData.username) // now we have access to decodedData.username here but we are also using it in /me route 
    // So if we are giving control to next middleware then we also have to give decodedData.username to next middleware
    {
        // As we know that middlewares can modify the request so we will populate the req object to send data to next middleware
        req.username = decodedData.username; // Now we can access the username in other middleware throught req object
        next()
    } else {
        res.json({ msg: "You are not allowed/verified" });
    }
}
//Harkirat's code
function auth(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err) // Invalid token
                res.status(401).send({
                    message: "Unauthorized"
                })
            } else {
                console.log(decoded) // decoded returns you the object ===> { username: 'abc',password: '123' }
                req.user = decoded;
                next();
            }
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}

app.get("/me-1", auth, (req, res) => {
    const user = req.user;

    res.send({
        username: user.username
    })
})

app.get("/me", authMiddleware, (req, res) => {
    // const userFound = users.find((user) => user.username === decodedData.username);

    const userFound = users.find((user) => user.username === req.username); // Using populated req object we can access username


    if (userFound) {
        res.json({
            username: userFound.username,
            password: userFound.password,
        })
    } else {
        res.json({ msg: "Invalid token" })
    }
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})