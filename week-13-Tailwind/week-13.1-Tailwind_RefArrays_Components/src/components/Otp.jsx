import { useRef } from "react"


// export default function Otp() {
//     const ref1 = useRef();
//     const ref2 = useRef();
//     const ref3 = useRef();
//     const ref4 = useRef();
//     const ref5 = useRef();
//     return (
//         <div className="flex">
//             <SubOtp
//                 refrence={ref1} onDone={() => {
//                     ref2.current.focus();
//                 }}
//             />
//             <SubOtp
//                 refrence={ref2} onDone={() => {
//                     ref3.current.focus();
//                 }}
//             />
//             <SubOtp refrence={ref3} onDone={() => ref4.current.focus()} />
//             <SubOtp refrence={ref4} onDone={() => ref5.current.focus()} />
//             <SubOtp refrence={ref5} />
//         </div>

//     )
// }


export default function Otp() {
    const refs = Array(5).fill().map(() => useRef(null));

    // const refs = Array.from({ length: 5 }, () => useRef(null))

    const handleOnDone = (index) => {
        if (index < refs.length - 1) {
            refs[index + 1].current.focus();
        }
    };

    return (
        <div className="flex">
            {refs.map((ref, index) => (
                <SubOtp
                    key={index}
                    reference={ref}
                    onDone={() => handleOnDone(index)}
                />
            ))}
        </div>
    );
}




function SubOtp({ reference, onDone }) {
    return (
        <div>
            <input
                ref={reference}
                onChange={(e) => {
                    // If the length of the input value is 1 (i.e. the user has entered a single digit)
                    // and the value is a number (i.e. not NaN), then call the onDone() function.
                    // This is done so that the focus is automatically moved to the next input box
                    // when a user enters a digit in the previous box.
                    if (e.target.value.length === 1 && !isNaN(e.target.value)) {
                        onDone();
                    }
                }}
                type="text"
                maxLength={1}
                className='w-10 h-10 rounded-md px-2 m-3'
            />
        </div>
    )
}


