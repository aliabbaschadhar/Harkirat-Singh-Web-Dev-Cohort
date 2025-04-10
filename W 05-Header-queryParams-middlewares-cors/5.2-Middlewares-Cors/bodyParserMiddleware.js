const express = require("express");
const bodyParser = require("body-parser"); //To parse the JSON data from body in the post request

const app = express();

app.use(bodyParser.json());// Why do we need it?
// When client sends JSON data in the request body, it's sent as a string
// Express/Node.js needs to parse this string into a JavaScript object to make it usable
// That's why we use body-parser middleware - it converts JSON strings to JS objects
// Without this middleware, req.body would be undefined or raw unparsed data

// app.use(express.json()); // Express has this built-in now, does the same thing

app.post("/add", (req, res) => {
    console.log(req.body);
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        ans: a + b
    })
})

app.listen(3000, () => {
    console.log("Server running !");
})
