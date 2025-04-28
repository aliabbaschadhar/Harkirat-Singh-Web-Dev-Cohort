"use client";

import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./";
// import { useWindowSize } from "@uidotdev/usehooks";
import { Circle, Pencil, PentagonIcon, RectangleHorizontal, TextCursor } from "lucide-react";

enum Tool {
    Pencil = "pencil",
    Rectangle = "rectangle",
    Circle = "circle",
    Pentagon = "pentagon",
    Text = "text",
}

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

    const [selectedTool, setSelectedTool] = useState<Tool>(Tool.Pencil);




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

    useEffect(() => {
        // @ts-ignore
        window.selectedTool = selectedTool;
    }, [selectedTool])

    return (
        <div>
            <canvas
                className="overflow-hidden"
                ref={canvasRef}
                width={size.width ?? 0}
                height={size.height ?? 0}
            ></canvas>
            <Topbar
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
            />
        </div>
    )
}


function Topbar({ selectedTool, setSelectedTool }:
    {
        selectedTool: Tool;
        setSelectedTool: (tool: Tool) => void;
    }) {
    return (
        <div className="fixed top-1.5 left-1/2 transform -translate-x-1/2 flex items-center gap-1 bg-gray-900 rounded-lg shadow-md p-1.5">
            <IconButton
                icon={<Pencil />}
                onClick={() => setSelectedTool(Tool.Pencil)}
                activated={selectedTool === Tool.Pencil}
            />
            <IconButton
                icon={<RectangleHorizontal />}
                onClick={() => { setSelectedTool(Tool.Rectangle) }}
                activated={selectedTool === Tool.Rectangle}
            />
            <IconButton
                icon={<Circle />}
                onClick={() => { setSelectedTool(Tool.Circle) }}
                activated={selectedTool === Tool.Circle}
            />
            <IconButton
                icon={<PentagonIcon />}
                onClick={() => { setSelectedTool(Tool.Pentagon) }}
                activated={selectedTool === Tool.Pentagon}
            />
            <IconButton
                icon={<TextCursor />}
                onClick={() => { setSelectedTool(Tool.Text) }}
                activated={selectedTool === Tool.Text}
            />
        </div>
    )
}