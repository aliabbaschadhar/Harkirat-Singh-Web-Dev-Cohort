"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.get("/signup", function (req, res) {
    res.send("Hello wold");
});
app.get("/signin", function (req, res) {
    res.send("Hello world");
});
app.get("/chat", function (req, res) {
    res.send("hello wolrd");
});
app.listen(3000);
