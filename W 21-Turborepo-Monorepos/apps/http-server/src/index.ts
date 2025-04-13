import express from "express";

const app = express();


app.get("/signup", (req, res) => {
    res.send("Hello wold");
})

app.get("/signin", (req, res) => {
    res.send("Hello world");
})

app.get("/chat", (req, res) => {
    res.send("hello wolrd");
})

app.listen(3000)