import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8081 });

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users: User[] = [
] // The simplest way to store the state in backend is create a global object/array/variable

function checkUser(token: string): string | null {
    if (!JWT_SECRET) {
        console.log("JWT_SECRET is undefined")
        return null;
    }

    try {

        const decoded = jwt.verify(token, JWT_SECRET)

        if (typeof decoded === "string") {
            return null;
        }

        if (!decoded || !(decoded as JwtPayload).userId) {
            return null;
        }

        return (decoded as JwtPayload).userId;
    } catch (error) {
        return null;
    }
}

// The websocket backend also needs to authorize the backend 
// I will connect only if the user is authorized otherwise i will close the connection
wss.on("connection", (ws, request) => {
    console.log("User connected")
    // Whenever someone connects first thing is to extract their token and make sure they are loggedIN
    const url = request.url; // ws:localhost:8081?token=13411341

    if (!url) return;

    const queryParams = new URLSearchParams(url.split("?")[1]); //["ws:localhost:8081", "token=1341114"]
    const token = queryParams.get('token') ?? "";

    const userId = checkUser(token);

    if (!userId) {
        ws.close();
        return;
    }

    //If not undefined or null then add the ws into global variable to keep track of it
    users.push({
        ws,
        userId,
        rooms: []
    })

    ws.on("message", async (data) => {
        const parsedData = JSON.parse(data as unknown as string) // Convert the string into JSON object
        // {type: "join-room",roomId:1}
        if (parsedData.type === "join-room") {
            const user = users.find(x => x.ws === ws);

            if (user && !user.rooms.includes(parsedData.roomId)) {
                user.rooms.push(parsedData.roomId);
            }

        }
        else if (parsedData.type === 'leave-room') {
            const user = users.find(x => x.ws === ws);

            if (!user) return; // If user not found

            if (user.rooms.includes(parsedData.roomId)) {
                user.rooms = user.rooms.filter(x => x !== parsedData.roomId)
            }

        } else if (parsedData.type === "chat") {

            const roomId = parsedData.roomId;
            const message = parsedData.message;

            await prismaClient.chat.create({
                data: {
                    roomId,
                    message,
                    userId
                }
            }) // That is the worst approach everytime the chat message will take more time to be broadcasted to participents
            // Bcz it is first added to database and the broadcasted to particpents

            // todo: Use queues here

            users.forEach((user) => {
                if (user.rooms.includes(roomId)) {

                    user.ws.send(JSON.stringify({
                        // JSON.stringify because the websocket servers can only send strings and binary data
                        type: "chat",
                        message,
                        roomId
                    }))

                }
            })
        }


    })
})