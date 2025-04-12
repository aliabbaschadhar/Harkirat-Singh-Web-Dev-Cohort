import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export function GET(req: NextRequest) {
    const headers = req.headers;
    //@ts-ignore
    const authorizationHeader = headers["authorization"];
    //@ts-ignore
    const decoded = jwt.decode(authorizationHeader, "SECRET");
    //@ts-ignore
    const userId = decoded.userId;


    // hit the DB to get user profile picture

    return NextResponse.json({
        avatarUrl: "https://images.google.com/cat.png"
    })
}