import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        user: "harkirat",
        email: "harkirat@gmail.com"
    })
}

export function POST() {
    return NextResponse.json({
        user: "HarkiratPost",
        email: "harkiratPost@gmail.com"
    })
}

export function PUT() {
    return NextResponse.json({
        name: "harkiratPut",
        email: "hafdaljka@gmail.com"
    })
}