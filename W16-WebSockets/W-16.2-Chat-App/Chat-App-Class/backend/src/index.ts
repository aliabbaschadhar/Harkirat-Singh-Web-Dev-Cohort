import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

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