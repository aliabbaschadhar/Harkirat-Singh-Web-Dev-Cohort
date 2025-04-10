import { useState } from 'react'
import './App.css'

function App() {

    return (
        <>
            <ToggleMessage />
            <ToggleMessage />
            <ToggleMessage />

            {/* In react each of instance of component maintains its own state independently. */}
            {/* So, all three instances of <ToggleMessage/> will have their own isVisible state varialbes.  */}


        </>
    )
}

function ToggleMessage() {
    const [isVisible, setIsVisible] = useState(true); // Defining a new state variable
    // State is a dynamic part in a website.
    // When the value of state variable changes.
    // The component that uses the state variables re-renders.

    // Everything which is dynamic in website try to make it as a state variable.

    return <div>
        <button onClick={() => setIsVisible((isVisible) => !isVisible)}>Toggle message</button>
        {isVisible && <div ><p>This message is conditionally rendered now!</p></div>}
    </div>
}

export default App;
