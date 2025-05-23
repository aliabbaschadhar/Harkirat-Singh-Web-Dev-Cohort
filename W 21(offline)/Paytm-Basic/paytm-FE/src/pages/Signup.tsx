import { useState } from "react"
import { Heading, SubHeading, InputBox, Button, BottomWarning } from "./";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your infromation to create an account"} />
                    <InputBox onChange={(e) => {
                        setFirstName(e.target.value)
                    }} placeholder="John" label={"First Name"} />
                    <InputBox
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
                        placeholder="Doe" label={"Last Name"} />
                    <InputBox
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        placeholder="harkirat@gmail.com" label={"Email"} />
                    <InputBox
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        placeholder="123456" label={"Password"} />
                    <div className="pt-4">
                        <Button
                            onClick={
                                async () => {
                                    const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                        firstName,
                                        lastName,
                                        username: email,
                                        password
                                    })
                                    console.log(res.data)
                                    const data = res.data as { status: string; token: string };
                                    localStorage.setItem("authorization", data.token);
                                    navigate("/signin")
                                }
                            }
                            label={"Sign up"}
                        />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    )
}

