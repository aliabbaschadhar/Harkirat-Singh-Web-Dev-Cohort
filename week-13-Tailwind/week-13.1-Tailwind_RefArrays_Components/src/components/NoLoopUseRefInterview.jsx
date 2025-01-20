import { useRef, useEffect } from 'react'

export default function NoLoopUseRefInterview({ number }) {

    const refs = useRef([]);

    useEffect(() => {
        // Ensure the refs array has exactly 'number' elements by trimming extra elements
        refs.current = refs.current.slice(0, number);
    }, [number]); // Run this effect whenever the 'number' prop changes

    return (
        <div className='flex justify-center'>
            {Array.from({ length: number }).map((_, index) => <SubOtp
                key={index}
                refrence={(ele) => refs.current[index] = ele} // Store each input element reference
                onDone={() => {
                    if (index < 0 || index >= number - 1) {
                        return;
                    }
                    refs.current[index + 1].focus() // Focus the next input when the current one is filled
                }}
                OnBack={() => {
                    if (index <= 0) return;
                    refs.current[index - 1].value = ""; // Clear the previous input value
                    refs.current[index - 1].focus();   // Focus the previous input when backspace is pressed
                }}
            />)}
        </div>
    )
}

function SubOtp({
    refrence, onDone, OnBack
}) {
    return (
        <div >
            <input
                type="text"
                className='w-10 h-10 rounded-md px-2 m-3'
                maxLength={1} // Limit each input to 1 character
                ref={refrence} // Assign the reference for this input
                onChange={(e) => {
                    if (!isNaN(e.target.value)) { // Check if input is a number
                        onDone();
                    }
                }}
                onKeyUp={(e) => e.key === "Backspace" && OnBack()} // Trigger back navigation on backspace
            />
        </div>
    )
}
