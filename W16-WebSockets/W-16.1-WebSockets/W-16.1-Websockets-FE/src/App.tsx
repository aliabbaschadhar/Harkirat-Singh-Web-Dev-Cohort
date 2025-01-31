import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState();
  const inputRef = useRef();

  function sendMessage() {
    if (!socket) {
      return;
    }
    if (!inputRef.current) {
      return;
    }
    //@ts-ignore
    const msg = inputRef.current.value;
    //@ts-ignore
    socket.send(msg);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    // To received message
    ws.onmessage = (event) => {
      alert(event.data)
    }
  }, [])

  return (
    <div>
      <input
        // @ts-ignore
        ref={inputRef}
        type="text"
        className='bg-gray-300 text-black p-2 rounded-lg mr-2'
      />
      <button onClick={sendMessage}> Send</button>
    </div>
  )
}

export default App
