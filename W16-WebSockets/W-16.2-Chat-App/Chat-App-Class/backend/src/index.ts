import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8082 });

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
        // Here message will come in the form of string not an object it will come like:
        //"{
        //  'type':'join',
        //   'payload':'{
        //      'room':'12114312',
        //    }'
        // }"

        // So we will convert it into in the form of an js object

        const parsedMessage = JSON.parse(message as unknown as string);


        if (parsedMessage.type === "join") {

            console.log("User wants to join the room: " + parsedMessage.payload.roomId)

            allSockets1.push({
                socket,
                room: parsedMessage.payload.roomId,
            })
        }

        if (parsedMessage.type === 'chat') {
            const currentUserRoom = allSockets1.find((x) => x.socket === socket)?.room; // If the message sender rooom exists in allSockets1 array then find the room of that user.

            console.log("User wants to chat ");

            allSockets1.forEach((arraySocket) => {
                if (arraySocket.room === currentUserRoom) {
                    arraySocket.socket.send(parsedMessage.payload.message); // We were sending the message to the socket which is listening to the message instead of the socket which is sending the message.
                }
            })

        }
    })

    socket.on("disconnect", () => {
        allSockets1 = allSockets1.filter(x => x.socket !== socket)
    })
})



//****************************Simple Chat App ******************* */

// let allSockets: WebSocket[] = [];

// wss.on("connection", (ws) => {

//     allSockets.push(ws);
//     console.log("User connected");

//     // To receive message from the client and then send to other client connected to the same webserver.
//     ws.on("message", (msg) => {
//         console.log("Message received " + msg.toString());
//         allSockets.forEach((socket) => socket.send(msg.toString() + " : To all users "));
//         // ws.send(msg.toString() + ": sent from the server");
//     })

//     // Handling dead sockets if any of socket is dead then the message is not sent to that socket by server.
//     ws.on("disconnect", () => {
//         allSockets = allSockets.filter((workingSocket) => workingSocket !== ws)
//     })
// })