"use client";

import axios from "axios"

export default function Page() {
    return <div className="flex flex-col items-center text-white bg-blue-400 justify-center translate-y-1/2">
        <input className="bg-orange-300 m-2 p-2" type="text" />
        <input className="bg-orange-300 m-2 p-2" type="text" />
        <button
            onClick={async () => {
                const res = await axios.post("http://localhost:3000/api/signin", {
                    username: "alpha",
                    password: "random123"
                })

                localStorage.setItem("token", res.data.token);
            }}
        >Signin</button>
    </div>
}