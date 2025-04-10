import { useRef, useState } from 'react'

function StopWatchuseState() {
    const [currentTime, setCurrentTime] = useState(0);
    const [timer, setTimer] = useState(null);// Why doing this using useState() for timer is a bad approach instead of using useRef();

    // const timer = useRef();

    // Bcz it is re-rendering the component twice a time instead of one bcz component renders when the state changes.

    // And here state changes 2 times one when current time is set and two when timer go set (setCurrentTime, setTimer);

    // So always use useRef to get refrence of value or a DOM element. Period.

    function startClock() {
        if (timer !== null) return;
        const newTimer = setInterval(() => {
            setCurrentTime(c => c + 1);
        }, 1000);
        setTimer(newTimer);
    }

    function stopClock() {
        if (timer === null) return;
        clearInterval(timer);
    }

    return (
        <div>
            <h1>{currentTime}</h1>
            <button onClick={startClock}>Start</button>
            <button onClick={stopClock}>Stop</button>
        </div>
    )
}

export default StopWatchuseState