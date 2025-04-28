import { getExistingShapes } from "./http";

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


export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "chat") {
                const parsedShape = JSON.parse(message.message);
                this.existingShapes.push(parsedShape.shape)
                this.clearCanvas(); // To do re-rendering
            }
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Always set the stroke style before drawing shapes
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;

        this.existingShapes.forEach((shape) => {  // Use forEach instead of map for clarity
            if (shape.type === "rectangle") {
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                // Make sure the radius is positive before drawing
                const radius = Math.abs(shape.radius);
                if (radius > 0) {
                    this.ctx.beginPath();
                    this.ctx.arc(shape.centerX, shape.centerY, radius, 0, 2 * Math.PI);
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
            }
        });
    }

    initMouseHandlers() {

    }
}