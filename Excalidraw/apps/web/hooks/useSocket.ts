import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(WS_URL + "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjNjNDI2NS0xM2E2LTQyNGItYWY0MC05ODdjZmJjZDQ2MzQiLCJpYXQiOjE3NDUyNjE0MjV9.wkK1bEM6zsNOX2jNOw-1lSDsMAl0JPBLrPEKhjHyecU");
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }

    }, [])

    return {
        socket, loading
    }
}