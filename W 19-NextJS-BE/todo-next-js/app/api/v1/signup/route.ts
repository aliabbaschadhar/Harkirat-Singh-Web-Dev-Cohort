import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

const prismaClient = new PrismaClient();

export async function POST(req: NextRequest) {
    //? Question is how do we get payload from body here?
    //? req.body

    //*Ans==>
    const data = await req.json();

    console.log(data)

    try {
        await prismaClient.user.create({
            data: {
                username: data.username,
                password: data.password
            }
        });
    } catch (error) {
        return NextResponse.json({
            message: "Error creating user",
            error: error.message
        }, { status: 400 });
    }

    return NextResponse.json({
        message: "You have been signed up! "
    })
}