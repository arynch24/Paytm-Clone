import React from 'react'
import Button from '../components/Button';

const SignUp = () => {
    return (
        <div className='h-screen text-center flex flex-col items-center justify-center '>
            <h1 className='text-4xl font-bold mb-4' >SignUp</h1>
            <p className='mb-4 text-md'>Enter your information to create an account</p>

            <div className="w-full max-w-sm border rounded-md p-4">
                <div className="flex justify-center items-center">
                    <div className="w-full">
                        <h3 className="font-bold text-md mb-1 text-left">First Name</h3>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md text-md mb-4"
                            type="text"
                            placeholder="John"
                        />
                        <h3 className="font-bold text-md mb-1 text-left">Last Name</h3>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md text-md  mb-4"
                            type="text"
                            placeholder="Doe"
                        />
                        <h3 className="font-bold text-md mb-1 text-left">Email</h3>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md text-md mb-4"
                            type="text"
                            placeholder="johndoe@example.com"
                        />
                        <h3 className="font-bold text-md mb-1 text-left">Password</h3>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md text-md mb-4"
                            type="text"
                            placeholder=""
                        />
                        <Button text={"SignUp"} className={"w-full"} />

                        <p className="text-sm font-semibold text-gray-800 mt-4">
                            Already have an account? <a href="/signin" className="text-gray-900 underline font-semibold hover:text-blue-700">Sign In</a>
                        </p>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default SignUp;
