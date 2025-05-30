import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Balance = () => {
    const [balance, setBalance] = useState(0.00);
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://paytm-clone-qbs7.onrender.com/api/v1/account/balance', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setBalance(response.data.balance);
                } else {
                    console.error('Failed to fetch balance: Unexpected status');
                }
            } catch (error) {
                console.error('Error fetching balance:', error.message);
            }
        };

        fetchBalance();

    }, []);
    return (
        <div className='px-8 mt-4 text-sm font-bold'>
            Your Balance: ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
    )
}

export default Balance
