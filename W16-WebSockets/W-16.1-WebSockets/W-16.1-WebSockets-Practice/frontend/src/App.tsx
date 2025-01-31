import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!inputRef.current || !socket) return;
    const msg = inputRef.current.value;
    socket.send(msg);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");

    ws.onopen = () => {
      setSocket(ws);
    }

    ws.onerror = ((error) => {
      console.error(error);
    })

    ws.onmessage = (event) => {
      alert(event.data);
    }
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder='Write message here...'
        className='p-4 mr-2 rounded-lg'
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App

