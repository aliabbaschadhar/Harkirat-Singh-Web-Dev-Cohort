"use client";

import { useEffect, useRef, useState } from "react";


export default function Canvas() {
    // const [clicked, setClicked] = useState<boolean>(false)

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            if (!ctx) return;

            // ctx.strokeRect(25, 25, 100, 100);
            let clicked = false;
            let startX = 0;
            let startY = 0;

            canvas.addEventListener("mousedown", (e) => {
                // setClicked(true);
                clicked = true;
                startX = e.clientX;
                startY = e.clientY;
            })

            canvas.addEventListener("mouseup", (e) => {
                // setClicked(false);
                clicked = false;
                console.log(e.clientX)
                console.log(e.clientY)
            })

            canvas.addEventListener("mousemove", (e) => {
                if (clicked) {
                    const width = e.clientX - startX;
                    const height = e.clientY - startY;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "rgba(0,0,0)"
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                    ctx.strokeStyle = "rgba(255,255,255)"
                    ctx.strokeRect(startX, startY, width, height)
                }
            })
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