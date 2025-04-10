
import { useRef } from 'react'

// useRef
//Refrence to a DOM element
// Refrence to a value, such that when u change the value, the component DOES NOT RE-RENDER
export default function App() {

    // There are three types of variables in react
    // let value = 10;
    // const [value,setValue] = useState(10);
    // const valueRef = useRef(10); 

    const inputRef = useRef(null);
    function focusOnInput() {
        // document.getElementById("name").focus();
        // But that's not the elegant way to do in react.
        console.log(inputRef.current);
        inputRef.current.focus();
    }

    //* Moto: In react we don't do DOM manipulation by itself.


    return (
        <>
            <div>Signup
                <input ref={inputRef} id="name" type="text" />
            </div>
            <div>Signin
                <input type="text" />
            </div>
            {/* <button onClick={focusOnInput}>Submit</button> */}
            <button onClick={focusOnInput}>Submit</button>

        </>
    )
}
