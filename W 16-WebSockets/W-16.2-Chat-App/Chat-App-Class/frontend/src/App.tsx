import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState(["hello", "how", "are"])
  const wssRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const wss = new WebSocket("ws://localhost:8082");
    wssRef.current = wss;
    wss.onopen = () => {
      wss.send(JSON.stringify({
        "type": "join",
        "payload": {
          "roomId": "red"
        }
      }))
    }
    wss.onmessage = (event) => {
      setMessage(message => [...message, event.data]);
    }

    return () => {
      wss.close();
    }

  }, [])

  function sendMessages() {
    const message = inputRef.current!.value;
    wssRef.current?.send(JSON.stringify({
      "type": "chat",
      "payload": {
        "message": message,
      }
    }
    ))
  }

  return (
    <>
      <div className='h-screen w-[50vw]'>
        <div className='h-[80vh] bg-gray-300 rounded-2xl' >

          {message.map((msg, index) => (
            <div
              className='w-10 h-3 bg-blue-400 text-black m-3 rounded-3xl'
              key={index}
            >{msg}</div>
          ))}
        </div>
        <div>
          <input
            ref={inputRef}
            type="text"
            className='p-4 mx-3 rounded-xl text-black bg-pink-200 m-3'
          />
          <button
            onClick={() => sendMessages}
          >Send</button>
        </div>
      </div>
    </>
  )
}

export default App
