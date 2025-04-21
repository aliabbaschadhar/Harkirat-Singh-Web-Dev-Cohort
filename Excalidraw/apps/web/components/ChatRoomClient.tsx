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
    const [chats, setChats] = useState<{ message: string }[]>(messages)
    const { socket, loading } = useSocket();
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        // Socket is exists and loading is not happening then we will start listening to the mesages
        if (socket && !loading) {

            // first join the room 
            socket.send(JSON.stringify({
                type: "join-room",
                roomId: id,
            }))

            // then listen to the messages
            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data as string);
                if (parsedData.type === 'chat') {
                    setChats(c => [...c, { message: parsedData.message }])
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
        {chats.map((m, index) => <div key={index}>
            {m.message}
        </div>
        )}
        <div
        >
            <input
                placeholder='Enter message ...'
                ref={inputRef}
                type="text"
                style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    width: '200px'
                }}
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