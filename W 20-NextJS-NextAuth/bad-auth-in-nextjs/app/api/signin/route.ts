import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    // Ideally we should check the username and password in the DB and only if it is right 
    // We should return the JWT

    const body = await req.json();

    const { username, password } = body;
    // check in the DB if it is correct then give me Id

    const userId = 1;
    const token = jwt.sign({
        userId
    }, "SECRET")

    return NextResponse.json({
        token,
    })
}
