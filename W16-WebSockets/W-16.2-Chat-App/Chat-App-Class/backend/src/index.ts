import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket,
    room: string,
}

let allSockets1: User[] = []

// Will look like this

// [
//     {socket:socket, room:"room1"},
//     {socket:socket2, room:"room4131"},
//     {socket:socket1,room:"room1"},
// ]

wss.on("connection", (socket) => {

    socket.on("message", (message) => {

    })

    socket.on("disconnect", () => {
        allSockets1 = allSockets1.filter(x => x != socket)
    })
})





//****************************Simple Chat App ******************* */

let allSockets: WebSocket[] = [];

wss.on("connection", (ws) => {

    allSockets.push(ws);
    console.log("User connected");

    // To receive message from the client and then send to other client connected to the same webserver.
    ws.on("message", (msg) => {
        console.log("Message received " + msg.toString());
        allSockets.forEach((socket) => socket.send(msg.toString() + " : To all users "));
        // ws.send(msg.toString() + ": sent from the server");
    })

    // Handling dead sockets if any of socket is dead then the message is not sent to that socket by server.
    ws.on("disconnect", () => {
        allSockets = allSockets.filter((workingSocket) => workingSocket !== ws)
    })
})