import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config"

const wss = new WebSocketServer({ port: 8081 });

function checkUser(token: string): string | null {
    if (!JWT_SECRET) {
        console.log("JWT_SECRET is undefined")
        return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET)

    if (typeof decoded === "string") {
        return null;
    }

    if (!decoded || !(decoded as JwtPayload).userId) {
        return null;
    }

    return (decoded as JwtPayload).userId;
}

// The websocket backend also needs to authorize the backend 
// I will connect only if the user is authorized otherwise i will close the connection
wss.on("connection", (ws, request) => {
    // Whenever someone connects first thing is to extract their token and make sure they are loggedIN
    const url = request.url; // ws:localhost:8081?token=13411341

    if (!url) return;

    const queryParams = new URLSearchParams(url.split("?")[1]); //["ws:localhost:8081", "token=1341114"]
    const token = queryParams.get('token') ?? "";

    const authorizedUser = checkUser(token);

    if (!authorizedUser) {
        ws.close();
    }

    ws.on("message", (data) => {
        ws.send("pong");
    })
})