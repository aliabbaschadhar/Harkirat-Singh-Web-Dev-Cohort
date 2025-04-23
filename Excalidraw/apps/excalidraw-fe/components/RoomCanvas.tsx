"use client";
import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {


    // const [clicked, setClicked] = useState<boolean>(false)
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL + "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MTU0OGE2My0wYjE2LTQwY2UtODNlYS02NDM2OTA2NWQ5ZWIiLCJpYXQiOjE3NDU0NDY1ODZ9.csi6Ks9oL8dwVMIaXnnHroMq52GP6_YVm_1Dk_jTjdw")

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