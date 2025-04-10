import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8082 });

// wss ==> websocket server
// ws ==> webSocket

wss.on("connection", (socket) => {
    console.log("user connected")

    // setInterval(() => {
    //     socket.send("Current Soalana price is " + Math.random());
    // }, 1000)

    socket.on("message", (event) => {
        if (event.toString() === "ping") {
            socket.send("pong");
            console.log("pong")
        } else if (event.toString() === "pong") {
            socket.send("ping");
            console.log("ping")
        } else {
            socket.send("nothing bro")
        }
        // socket.emit(event.toString());

    })


})


// //event handler
// wss.on("connection", (ws) => {
//     // .on(event, listener): This is a method used to register an event listener for a specific event on the WebSocket server.
//     // The event is a string that specifies the type of event you want to listen for,
//     // and listener is a callback function that will be executed when that event occurs.
//     // The event handler is a callback function that takes a WebSocket object as its parameter.
//     // This event is triggered when a client connects to the server
//     // The 'ws' parameter is an instance of the WebSocket class and
//     // represents the connection to the client

//     ws.on("error", console.error);
//     // This event is triggered when an error occurs

//     ws.on("message", function message(data) {
//         // This event is triggered when a message is received from the client
//         // The 'data' parameter is the message received from the client
//         console.log("received: %s", data);
//     })

//     ws.send("something");
//     // Send a message to the client
// })


