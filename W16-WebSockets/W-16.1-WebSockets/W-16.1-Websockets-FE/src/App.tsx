import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState<string[]>([])
  const [userMessages, setUserMessages] = useState<string[]>([])
  const [socket, setSocket] = useState<WebSocket | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  function sendMessage() {
    if (!socket) {
      return;
    }
    if (!inputRef.current) {
      return;
    }

    const msg = inputRef.current?.value.toString();
    socket.send(msg);

    inputRef.current.value = " ";
    inputRef.current.focus();
    setUserMessages((prev) => [...prev, msg])
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8082");
    setSocket(ws);

    // To received message
    ws.onmessage = (event) => {
      setMessages(prevMessages => [...prevMessages, event.data]);
    }
    return () => {
      ws.close();
    }
  }, [])

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        className='bg-gray-300 text-black p-2 rounded-lg mr-2'
        onKeyDown={(e) => (e.key === "Enter" && sendMessage())}
      />
      <button onClick={sendMessage}

      > Send</button>

      <div>
        {userMessages.map((userMessage, index) => (
          <div
            key={index}
            className='bg-amber-600 rounded-2xl m-2'
          >
            <h5>Sent by user</h5>
            <p>{userMessage}</p>
          </div>
        ))}
        {messages.map((message, index) => (
          <p key={index} className='bg-amber-200 p-2.5 text-black m-1.5 rounded-2xl'>{message}</p>
        ))}
      </div>
    </div>
  )
}

export default App
