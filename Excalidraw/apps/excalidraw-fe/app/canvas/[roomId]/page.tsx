"use client";

import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";


export default function Canvas() {
    // const [clicked, setClicked] = useState<boolean>(false)

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            initDraw(canvasRef.current);
        }
    }, [canvasRef])

    return (
        <div >
            <canvas
                // className="bg-amber-800"
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
            ></canvas>
        </div >
    )
}