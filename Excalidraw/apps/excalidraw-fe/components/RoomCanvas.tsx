"use client";
import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./";

export function RoomCanvas({ roomId }: { roomId: string }) {


    // const [clicked, setClicked] = useState<boolean>(false)
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL + "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwZDhjYzY3My05NjcwLTRmNDctYTIzNC04NTdiMThhYTc1MjciLCJpYXQiOjE3NDU0OTEwNzF9.n3jLAyFFmnDLode1UwqaxiXUvvQmx5hvs7-X34JmdCE")

        ws.onopen = () => {
            setSocket(ws);
            // send request to server to join the room
            ws.send(JSON.stringify({
                type: "join-room",
                roomId: roomId
            }))
        }

    }, [])

    if (!socket) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div >
            <Canvas
                roomId={roomId}
                socket={socket} // Pass the socket to the canvas component
            />
        </div >
    )
}