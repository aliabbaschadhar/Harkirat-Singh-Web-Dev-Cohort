import { useRef } from "react"

function Otp({ number }) {
    const refs = useRef([]);
    return (
        <div className="flex justify-center gap-3">
            {Array.from({ length: number }).map((_, index) =>
                <SubOpt
                    key={index}
                    refrence={(ele) => refs.current[index] = ele}
                    onDone={() => {
                        if (index >= number - 1) return;
                        refs.current[index + 1].focus();
                    }}
                    onBack={() => {
                        if (index <= 0) return;
                        refs.current[index - 1].focus();
                    }}
                />
            )}
        </div>
    )
}

function SubOpt({ refrence, onDone, onBack }) {

    return (
        <div>
            <input
                type="text"
                className="border border-blue-200 w-10 h-10 rounded-md mt-6"
                maxLength={1}
                ref={refrence}
                onChange={(e) => {
                    !isNaN(e.target.value) && onDone();
                }}
                onKeyUp={(e) => {
                    if (e.key === "Backspace") {
                        e.target.value = "";
                        onBack();
                    }
                }}
            />
        </div>
    )
}

export default Otp;