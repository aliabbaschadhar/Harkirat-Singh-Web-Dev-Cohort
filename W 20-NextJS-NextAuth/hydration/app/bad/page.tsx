"use client";
// Reason of server components was introduced that:::
//  Somethings do not change at time so make then server components like they fetching data from and in the whole life span of app they will fetch data so make them as server component
// Something  do change at time so make them a client component like number of count variable etc etc. There is some intractivity in it so make them as client component.
import { useState } from "react"

export default function Page() {
    const [count, setCount] = useState<number>(0)
    return <div>
        Hello from bad
        <button
            className="m-3 p-2 bg-slate-400 text-white rounded-xl cursor-pointer"
            onClick={() => setCount(c => c + 1)}
        >Click me! {count}</button>
    </div>
}