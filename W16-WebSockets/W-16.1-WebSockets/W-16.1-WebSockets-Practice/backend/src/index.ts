import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8083 });

wss.on("connection", (ws) => {
    console.log("User connected")!

    ws.on("message", (data) => {
        if (data.toString() === "ping") {
            ws.send("pong");
        } else if (data.toString() === "pong") {
            ws.send("ping");
        } else {
            ws.send("Tumhain bapa ki qasam");
        }
    })
});
