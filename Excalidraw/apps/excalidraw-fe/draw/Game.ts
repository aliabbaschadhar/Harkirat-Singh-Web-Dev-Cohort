/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getExistingShapes } from "./http";
import { Tool } from "@/components/Canvas";

type Shape =
    {
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
        points: Array<{ x: number, y: number }>,
    } | {
        type: "pentagon",
        centerX: number,
        centerY: number,
        radius: number,
    } | {
        type: "text",
        x: number;
        y: number;
        content: string;
        fontSize?: number;
        fontFamily?: string;
    }


export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool = Tool.Circle;
    private pencilPoints: Array<{ x: number, y: number }> = [];
    private textInput: HTMLInputElement | null = null;
    socket: WebSocket;

    // Store event handler references for cleanup
    private mouseDownHandler: (e: MouseEvent) => void;
    private mouseMoveHandler: (e: MouseEvent) => void;
    private mouseUpHandler: (e: MouseEvent) => void;
    private keyDownHandler: (e: KeyboardEvent) => void;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;

        // Initialize handler methods with proper binding
        this.mouseDownHandler = this.handleMouseDown.bind(this);
        this.mouseMoveHandler = this.handleMouseMove.bind(this);
        this.mouseUpHandler = this.handleMouseUp.bind(this);
        this.keyDownHandler = this.handleKeyDown.bind(this);

        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }

    destroy() {
        // Remove all event listeners
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
        document.removeEventListener("keydown", this.keyDownHandler);

        // Clean up any active text input
        if (this.textInput && document.body.contains(this.textInput)) {
            document.body.removeChild(this.textInput);
            this.textInput = null;
        }
    }

    setTool(tool: Tool) {
        this.selectedTool = tool;
        // Clean up any active text input when switching tools
        const existingTextInput = document.querySelector('input[type="text"][style*="position: absolute"]');
        if (existingTextInput) {
            document.body.removeChild(existingTextInput);
        }
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas();
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

        this.existingShapes.forEach((shape) => {
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
            } else if (shape.type === "pencil") {
                if (shape.points.length > 1) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(shape.points[0].x, shape.points[0].y);

                    for (let i = 1; i < shape.points.length; i++) {
                        this.ctx.lineTo(shape.points[i].x, shape.points[i].y);
                    }

                    this.ctx.stroke();
                    this.ctx.closePath();
                }
            } else if (shape.type === "pentagon") {
                this.drawPentagon(shape.centerX, shape.centerY, shape.radius);
            } else if (shape.type === "text") {
                this.ctx.font = `${shape.fontSize || 16}px ${shape.fontFamily || 'Arial'}`;
                this.ctx.fillStyle = "white";
                this.ctx.fillText(shape.content, shape.x, shape.y);
            }
        });
    }

    // Helper method to draw a pentagon
    drawPentagon(centerX: number, centerY: number, radius: number) {
        this.ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI / 5) - Math.PI / 2; // Start from top
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }

    handleMouseDown(e: MouseEvent) {
        this.clicked = true;
        this.startX = e.clientX;
        this.startY = e.clientY;

        if (this.selectedTool === Tool.Pencil) {
            this.pencilPoints = [{ x: e.clientX, y: e.clientY }];
        } else if (this.selectedTool === Tool.Text) {
            // Create text input field at click position
            if (this.textInput && document.body.contains(this.textInput)) {
                document.body.removeChild(this.textInput);
            }

            this.textInput = document.createElement("input");
            this.textInput.type = "text";
            this.textInput.style.position = "absolute";
            this.textInput.style.left = `${e.clientX}px`;
            this.textInput.style.top = `${e.clientY}px`;
            this.textInput.style.background = "transparent";
            this.textInput.style.color = "white";
            this.textInput.style.border = "1px solid white";
            this.textInput.style.zIndex = "1000";

            document.body.appendChild(this.textInput);
            this.textInput.focus();
        }
    }

    handleMouseMove(e: MouseEvent) {
        if (!this.clicked) return;

        // Get dimensions with proper handling of negative values
        const width = Math.abs(e.clientX - this.startX);
        const height = Math.abs(e.clientY - this.startY);
        const actualStartX = Math.min(this.startX, e.clientX);
        const actualStartY = Math.min(this.startY, e.clientY);

        this.clearCanvas();
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;

        if (this.selectedTool === Tool.Rectangle) {
            this.ctx.strokeRect(actualStartX, actualStartY, width, height);
        } else if (this.selectedTool === Tool.Circle) {
            const radius = Math.max(width, height) / 2;
            const centerX = actualStartX + width / 2;
            const centerY = actualStartY + height / 2;

            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.closePath();
        } else if (this.selectedTool === Tool.Pentagon) {
            const radius = Math.max(width, height) / 2;
            const centerX = actualStartX + width / 2;
            const centerY = actualStartY + height / 2;

            this.drawPentagon(centerX, centerY, radius);
        } else if (this.selectedTool === Tool.Pencil) {
            this.pencilPoints.push({ x: e.clientX, y: e.clientY });

            // Draw the current pencil path
            this.ctx.beginPath();
            this.ctx.moveTo(this.pencilPoints[0].x, this.pencilPoints[0].y);

            for (let i = 1; i < this.pencilPoints.length; i++) {
                this.ctx.lineTo(this.pencilPoints[i].x, this.pencilPoints[i].y);
            }

            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    handleMouseUp(e: MouseEvent) {
        if (!this.clicked) return;
        this.clicked = false;

        let shape: Shape | null = null;

        // Get absolute dimensions to handle negative width/height
        const width = Math.abs(e.clientX - this.startX);
        const height = Math.abs(e.clientY - this.startY);
        const actualStartX = Math.min(this.startX, e.clientX);
        const actualStartY = Math.min(this.startY, e.clientY);

        if (this.selectedTool === Tool.Rectangle) {
            shape = {
                type: "rectangle",
                x: actualStartX,
                y: actualStartY,
                height: height,
                width: width
            };
        } else if (this.selectedTool === Tool.Circle) {
            const radius = Math.abs(Math.max(width, height) / 2);
            const centerX = actualStartX + width / 2;
            const centerY = actualStartY + height / 2;

            shape = {
                type: "circle",
                radius: radius,
                centerX: centerX,
                centerY: centerY
            };
        } else if (this.selectedTool === Tool.Pentagon) {
            const radius = Math.abs(Math.max(width, height) / 2);
            const centerX = actualStartX + width / 2;
            const centerY = actualStartY + height / 2;

            shape = {
                type: "pentagon",
                radius: radius,
                centerX: centerX,
                centerY: centerY
            };
        } else if (this.selectedTool === Tool.Pencil && this.pencilPoints.length > 1) {
            shape = {
                type: "pencil",
                points: this.pencilPoints
            };
            this.pencilPoints = [];
        } else if (this.selectedTool === Tool.Text) {
            // Text is handled differently - the shape is created when the text input loses focus
            return;
        }

        if (!shape) return;

        this.existingShapes.push(shape);
        this.clearCanvas(); // To redraw with the new shape

        // Send shape to server
        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({ shape }),
            roomId: this.roomId
        }));
    }

    handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Enter" && this.textInput && this.textInput === document.activeElement) {
            const content = this.textInput.value;
            const x = parseInt(this.textInput.style.left);
            const y = parseInt(this.textInput.style.top);

            if (content) {
                const textShape: Shape = {
                    type: "text",
                    x,
                    y: y + 16, // Add offset for baseline alignment
                    content,
                    fontSize: 16,
                    fontFamily: "Arial"
                };

                this.existingShapes.push(textShape);
                this.clearCanvas();

                // Send text shape to server
                this.socket.send(JSON.stringify({
                    type: "chat",
                    message: JSON.stringify({ shape: textShape }),
                    roomId: this.roomId
                }));
            }

            document.body.removeChild(this.textInput!);
            this.textInput = null;
        }
    }

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
        document.addEventListener("keydown", this.keyDownHandler);
    }
}