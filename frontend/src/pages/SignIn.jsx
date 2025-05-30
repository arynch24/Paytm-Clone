import React from 'react'
import Button from '../components/Button';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignInButton = async () => {
        if (!username || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const res = await axios.post("https://paytm-clone-qbs7.onrender.com/api/v1/user/signin", {
                username,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log(res.data);

            if (res.status === 200) {
                alert("SignIn Successful");
                localStorage.setItem("token", res.data.token); // Store the token in local storage
                navigate("/dashboard");
            }
        } catch (err) {
            console.error(err);
            alert(res.json().message);
        }
    };


    return (
        <div className='h-screen text-center flex flex-col items-center justify-center '>
            <div className="w-full max-w-sm border rounded-md p-4">
                <h1 className='text-4xl font-bold mb-4' >SignIn</h1>
                <p className='mb-4 text-md'>Enter your credentials to access your account</p>

                <div className="flex justify-center items-center">
                    <div className="w-full">
                        <h3 className="font-bold text-md mb-1 text-left">Email</h3>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md text-md mb-4"
                            type="email"
                            placeholder="johndoe@example.com"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <h3 className="font-bold text-md mb-1 text-left">Password</h3>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md text-md mb-4"
                            type="password"
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div onClick={handleSignInButton}>
                            <Button text={"SignIn"} className={"w-full"} />
                        </div>

                        <p className="text-sm font-semibold text-gray-800 mt-4">
                            Don't have an account? <Link to="/signup" className="text-gray-900 underline font-semibold hover:text-blue-700">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
