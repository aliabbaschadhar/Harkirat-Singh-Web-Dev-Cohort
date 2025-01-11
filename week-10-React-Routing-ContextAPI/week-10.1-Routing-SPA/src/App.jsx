import { useRef, useState } from 'react'
import './App.css'

function App() {
    const [currentTime, setCurrentTime] = useState(0);

    // let timer = 0;

    // const [timer, setTimer] = useState(0);

    const timerRef = useRef(null);
    function startClock() {
        if (timerRef.current !== null) {
            return;
        }
        timerRef.current = setInterval(() => {
            setCurrentTime(c => c + 1);
        }, 1000)

    }

    function stopClock() {
        if (timerRef.current === null) return;
        clearInterval(timerRef.current); // As we have used the let timer = 0 approach it is not able to stop the clock why?
        // Bcz as we know that whenever state in a component changes the component re-renders same happens here
        // Like when setCurrentTime changes the state then the App components get re-render which means that 
        // Timer will be equal to timer = setInterval(()=>{},1000) for a second of time and as soon as the component get re-render it get re-initiallize to zero ==> timer = 0;
    }

    return (
        <div>
            <div>{currentTime}</div>
            <button onClick={startClock}>Start the Clock</button>
            <button onClick={stopClock}>Stop the Clock</button>
        </div>
    )
}

export default App