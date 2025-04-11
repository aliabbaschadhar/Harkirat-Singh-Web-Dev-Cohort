import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    //? Question is how do we get payload from body here?
    //? req.body

    const data = await req.json();

    console.log(data)

    return NextResponse.json({
        message: "You have been signed up! "
    })
}