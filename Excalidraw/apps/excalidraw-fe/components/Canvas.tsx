"use client";

import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
// import { useWindowSize } from "@uidotdev/usehooks";

export function Canvas({ roomId, socket }: {
    roomId: string;
    socket: WebSocket;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });
    // width:typeof window !== undefined // This is will be wrong because the typeof window will return string and undefined is a primitive value which will always return true. 
    // Because we are comparing an primitive value with a string 

    // const { width, height } = useWindowSize(); // measure only the viewport size not the actual available size when the chrome dev tools are open

    //handle window resize here

    useEffect(() => {
        const handleResize = () => {
            setSize({ height: window.innerHeight, width: window.innerWidth })
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])


    useEffect(() => {
        // setSize({ height: window.innerHeight, width: window.innerWidth });
        if (canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket) // Pass the socket to the initDraw function bcz we need to send the data to the server 
        }
    }, [canvasRef, roomId, socket]);

    return (
        <div>
            <canvas
                // className="bg-amber-800"
                ref={canvasRef}
                width={size.width ?? 0}
                height={size.height ?? 0}
            ></canvas>
        </div>
    )
}