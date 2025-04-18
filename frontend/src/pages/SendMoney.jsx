import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    const handleTransfer = async () => {
        if (!amount) {
            alert("Please enter an amount");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to:id,
                amount
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log(res.data);

            if (res.status === 200) {
                alert("Transfer Successful");
            }
        } catch (err) {
            console.error(err);
            alert("Transfer Failed");
        }
    }


    return (
        <div className='w-full h-screen bg-gray-100 flex justify-center items-center'>
            <div className='border-gray-300 rounded-lg w-80 p-6 bg-white '>
                <h1 className='text-xl font-bold text-center text-gray-800 mb-8'>Send Money</h1>

                <div className='flex gap-3 items-center mb-2'>
                    <div className='h-6 w-6 rounded-full bg-green-400 p-4 text-xl font-semibold flex justify-center items-center'>{name?.[0]}</div>
                    <h4 className='text-lg font-semibold'>{name}</h4>
                </div>

                <div>
                    <h3 className='text-sm font-semibold mb-2'>Amount (in Rs)</h3>
                    <input type="text" className='w-full border-2 border-gray-300 rounded-md p-2 mb-4' value={amount} placeholder='Enter amount' onChange={(e) => { setAmount(e.target.value) }} />
                </div>
                <button className='bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full ' onClick={handleTransfer}>Initiate Transfer</button>
            </div>
        </div>
    )
}

export default SendMoney