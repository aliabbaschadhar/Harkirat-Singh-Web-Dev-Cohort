import { useEffect, useState } from "react"
import axios from "axios"


export default async function Page() {

    // This is a react way to fetch data in next js we fetch data using async components
    // const [profilePicture, setProfilePicture] = useState("")
    // useEffect(() => {
    //     axios.get("http://localhost:3000/api/profile", {
    //         headers: {
    //             authorization: localStorage.getItem("token")
    //         }
    //     }).then((res) => {
    //         setProfilePicture(res.data.avatarUrl)
    //     })
    // }, [])

    // nextjs Way

    const res = await axios.get("http://localhost:3000/api/profile", {
        headers: {
            authroization: localStorage.getItem("token") // localStorage does not exist on server
        }
    })
    // To send token by localstorage we have to make any other request to backend to send jwt token 
    // By doing that we will lose the benefit of nextjs server side rendering
    const profilePicture = await res.data.avatarUrl;
    return <div>
        {profilePicture}
    </div>
}