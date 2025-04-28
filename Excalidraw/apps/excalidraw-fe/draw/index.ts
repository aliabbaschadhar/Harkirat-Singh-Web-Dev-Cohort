import { BACKEND_URL } from "@/config";
import axios from "axios";

type Shape = {
    type: "rectangle";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number,
} | {
    type: "pencil",
    startX: number;
    startY: number;
    endX: number,
    endY: number,
}


export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    const ctx = canvas.getContext("2d");

    // const exisitingShapes:Shape[] = [];
    const existingShapes: Shape[] = await getExistingShapes(roomId); // We will store the shapes on canvas in this variable

    if (!ctx) return;

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === "chat") {
            const parsedShape = JSON.parse(message.message);
            existingShapes.push(parsedShape.shape)
            clearCanvas(existingShapes, canvas, ctx); // To do re-rendering
        }
    }



    clearCanvas(existingShapes, canvas, ctx);

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
        if (!clicked) return;
        clicked = false;

        //@ts-ignore
        const selectedTool = window.selectedTool;
        let shape: Shape | null = null;

        // Get absolute dimensions to handle negative width/height
        const width = Math.abs(e.clientX - startX);
        const height = Math.abs(e.clientY - startY);

        // Store the actual starting coordinates (in case mouse moved left/up)
        const actualStartX = Math.min(startX, e.clientX);
        const actualStartY = Math.min(startY, e.clientY);

        if (selectedTool === "rectangle") {
            shape = {
                type: "rectangle",
                x: actualStartX,
                y: actualStartY,
                height: height,
                width: width
            }
        } else if (selectedTool === "circle") {
            // Calculate radius as half the maximum dimension, always positive
            const radius = Math.abs(Math.max(width, height) / 2);
            // Calculate center points from the actual start position
            const centerX = actualStartX + width / 2;
            const centerY = actualStartY + height / 2;

            shape = {
                type: "circle",
                radius: radius,
                centerX: centerX,
                centerY: centerY
            }
        }

        if (!shape) {
            return;
        }

        existingShapes.push(shape);
        // Redraw immediately to see changes
        clearCanvas(existingShapes, canvas, ctx);

        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape,
            }),
            roomId
        }))
    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            // Get dimensions with proper handling of negative values
            const width = Math.abs(e.clientX - startX);
            const height = Math.abs(e.clientY - startY);
            const actualStartX = Math.min(startX, e.clientX);
            const actualStartY = Math.min(startY, e.clientY);

            clearCanvas(existingShapes, canvas, ctx)
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;

            //@ts-ignore
            const selectedTool = window.selectedTool;

            if (selectedTool === "rectangle") {
                ctx.strokeRect(actualStartX, actualStartY, width, height)
            } else if (selectedTool === "circle") {
                // Calculate radius as half the maximum dimension
                const radius = Math.max(width, height) / 2;
                // Calculate center from the actual start position
                const centerX = actualStartX + width / 2;
                const centerY = actualStartY + height / 2;

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.closePath();
            }
        }
    })
}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Always set the stroke style before drawing shapes
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    existingShapes.forEach((shape) => {  // Use forEach instead of map for clarity
        if (shape.type === "rectangle") {
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "circle") {
            // Make sure the radius is positive before drawing
            const radius = Math.abs(shape.radius);
            if (radius > 0) {
                ctx.beginPath();
                ctx.arc(shape.centerX, shape.centerY, radius, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.closePath();
            }
        }
    });
}

async function getExistingShapes(roomId: string) {
    try {
        const res = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
        const messages = res.data.messages;

        const shapes = messages.map((x: { message: string }) => {
            try {
                const messageData = JSON.parse(x.message);
                const shape = messageData.shape;

                // Validate the shape before returning it
                if (shape && shape.type === "circle") {
                    shape.radius = Math.abs(shape.radius); // Ensure positive radius
                }
                return shape;
            } catch (err) {
                console.error("Error parsing message:", err);
                return null;
            }
        }).filter(Boolean); // Remove any null/undefined values

        return shapes;
    } catch (err) {
        console.error("Error fetching shapes:", err);
        return [];
    }
}