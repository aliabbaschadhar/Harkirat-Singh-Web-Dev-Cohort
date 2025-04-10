// Let’s say you have a game where you have to perform an action based on weather the user has pressed the up arrow key, down arrow key, left arrow key or right arrow key.

// What should the type of keyPressed be ?
// Should it be a string ? (UP, DOWN, LEFT, RIGHT) ?
// Should it be numbers ? (1, 2, 3, 4) ?
// The best thing in this case is to use enums

enum Direction {
    Up,
    Down,
    Right,
    Left,
}

function doSomething(keyPassword: Direction) {
    // do something
}

doSomething(Direction.Up);

console.log(Direction.Up) // by logging it we see "0"
//By default enums get values as 0,1,2

// Changing values in enums

enum Direction1 {
    Up = 1,
    Down, // becomes 2 by default
    Left, // becomes 3
    Right, // becomes 4
}

console.log(Direction1.Left) //3


enum DirectionSt {
    Up = "up",
    Down = "down",
    Left = "left",
    Right = 'right',
}

console.log(DirectionSt.Up)


// Common use case in express

enum ResponseStatus {
    Success = 200,
    NotFound = 404,
    Error = 500
}

import express from "express";

const app = express();

app.get("/", (req, res) => {
    if (!req.query.userId) {
        res.status(ResponseStatus.Success).json({})
    }
    // an so on
    res.status(ResponseStatus.Error).json({});
})
