import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";

export function Canvas({ roomId, socket }: {
    roomId: string;
    socket: WebSocket;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState({ height: 0, widht: 0 });

    useEffect(() => {
        setSize({ height: window.innerHeight, widht: window.innerWidth });
        if (canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket) // Pass the socket to the initDraw function bcz we need to send the data to the server 
        }
    }, [canvasRef, roomId]);
    return (
        <div>
            <canvas
                // className="bg-amber-800"
                ref={canvasRef}
                width={size.widht}
                height={size.height}
            ></canvas>
            <div className="flex items-center justify-center absolute right-3 bottom-10 bg-amber-400 rounded-3xl p-2 gap-1 cursor-pointer">
                <button className="bg-white text-black p-3 rounded-2xl hover:bg-amber-100 hover:scale-105">Rect</button><button className="bg-white text-black p-3 rounded-2xl hover:bg-amber-100 hover:scale-105">Circle</button>
            </div>
        </div>
    )
}