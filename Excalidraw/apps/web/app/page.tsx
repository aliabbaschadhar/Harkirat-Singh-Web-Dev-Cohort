"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  const [roomId, setRoomId] = useState<string>('');
  const router = useRouter();
  return (
    <div
      style={
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: '20px'
        }
      }
    >
      <h1>Welcome to the Chat App</h1>
      <h2>Join a Room</h2>
      <div
        style={
          {
            display: 'flex',
            flexDirection: 'row',
            gap: '2px',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }
      >
        <input
          type="text"
          placeholder='Room Id'
          onChange={(e) => {
            setRoomId(e.target.value)
          }}
          style={
            {
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '200px'
            }
          }
        />

        <button
          onClick={() => {
            if (roomId) {
              router.push(`/room/${roomId}`)
            }
            else {
              alert('Please enter a room id');
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
        >Join Room</button>
      </div>
    </div>
  )
}