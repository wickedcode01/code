'use client'
import { TextInput, Button,Title } from "@tremor/react";
import { useState } from "react";

export default function Login (){
    const [password, setpw] = useState(null);
    const [username, setun] = useState(null);
    return (
        <div className="login-page flex justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
            
            <div className="grid place-content-center">
            <Title className="text-white mb-5">Restaurant Admin</Title>
                <TextInput className="mb-5" placeholder="username" onValueChange={(val) => setun(val)} />
                <TextInput className="mb-5" placeholder="password" type="password" onValueChange={(val) => setpw(val)} />
                <Button onClick={() => {
                    fetch('/api/user/login',
                        { cache: 'no-store', method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) })
                        .then(res => res.json())
                        .then(data => {
                            document.cookie = `token=${data.token};path=/;max-age=43200;`;
                            document.location.href = '/admin';
                        }).catch(err => {
                            alert("login failed " + err)
                        });
                }} className="">submit</Button>
            </div>

        </div>
    )
}