import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("Connected")
    ws.send("Connected to a ws server");

    // Create a ping pong game

    ws.on("message", (event) => {
        if (event.toString() === "ping") {
            ws.send("pong");
        } else if (event.toString() === "pong") {
            ws.send("ping");
        } else {
            ws.send("Bro we are playing ping pong!!!");
        }
    })
})

// wss.on("connection", (ws) => {
//     console.log("Connected");
//     // If error comes
//     ws.on("error", console.error);

//     // To received message
//     ws.on("message", (event) => {
//         console.log(event.toString())
//     })

//     // Send a message to client
//     ws.send("Something");

// })