import { useEffect, useState } from "react"
import { Button } from "./"
import axios from "axios"


interface User {
    firstName: string;
    lastName: string;
    _id: number;
}

interface UserProps {
    user: User;
}

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get<{ user: User[] }>("http://localhost:3000/api/v1/user/bulk", {
            headers: {
                authorization: `${token}`
            }
        })
            .then((res) => {
                setUsers(res.data.user);
            })
    }, [])
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input
                onChange={(e => {
                    const value = e.target.value;
                    const token = localStorage.getItem("token");
                    axios.get<{ user: User[] }>(`http://localhost:3000/api/v1/user/bulk?filter=${value}`, {
                        headers: {
                            authorization: `${token}`
                        }
                    })
                        .then((res) => {
                            setUsers(res.data.user);
                        })
                }
                )}
                type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

function User({ user }: UserProps) {
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} />
        </div>
    </div>
}