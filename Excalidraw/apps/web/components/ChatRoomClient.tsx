"use client"

import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
    messages,
    id
}: {
    messages: { message: string }[];
    id: string
}) {
    const [chats, setChats] = useState(messages)
    const { socket, loading } = useSocket();
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (socket && !loading) {

            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id,
            }))

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data as string);
                if (parsedData.type === 'chat') {
                    setChats(c => [...c, parsedData.message])
                }
            }
        }
    }, [socket, loading, id])

    return <div
        style={
            {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                gap: '8px'
            }
        }
    >
        {messages.map((m, index) => <div key={index}>
            {m.message}
        </div>
        )}
        <div
        >
            <input
                ref={inputRef}
                type="text"
            ></input>
            <button
                onClick={() => {
                    if (inputRef.current) {
                        const message = inputRef.current.value;
                        socket?.send(JSON.stringify({
                            type: "chat",
                            roomId: id,
                            message
                        }))
                        inputRef.current.value = '';
                    }
                }}
                style={
                    {
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        backgroundColor: '#0070f3',
                        color: '#fff',
                        cursor: 'pointer'
                    }
                }
            >
                Send
            </button>
        </div>
    </div>
}