import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter,setFilter] = useState("");
    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`https://paytm-clone-qbs7.onrender.com/api/v1/user/bulk?filter=${filter}`,);
                console.log(`Users: ${response.data}`);
                setUsers(response.data.users);
            }
            catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        // Using debounce to limit the number of API calls
        const debounce = setTimeout(() => {
            fetchUsers();
        }
        , 500);
        return () => {
            clearTimeout(debounce);
        }

        //fetchUsers();
    }
        , [filter]);

    const navigate = useNavigate();

    return (
        <div className='m-8'>
            <h3 className='text-xl font-bold'>Users</h3>
            <input type="text" className=' w-full mb-4 border-2 border-gray-300 rounded-md p-2 mt-4' placeholder='Search users...' value={filter} onChange={(e)=>{
                setFilter(e.target.value);
            }}/>
            <div className='flex flex-col'>
                {users.map((user) => (
                    <div key={user._id} className='flex justify-between items-center border-b-1 border-gray-300 p-2'>
                        <div className='flex gap-4 justify-center items-center'>
                            <div className='h-8 w-8 rounded-full bg-gray-300 p-5 text-xl font-semibold flex justify-center items-center'>{user.firstName[0]}</div>
                            <h4 className='text-lg font-semibold'>{user.firstName} {user.lastName}</h4>
                        </div>
                        <div className='flex gap-4'>
                            <button className='bg-black hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded' onClick={
                                () => {
                                    //navigate can be used to send data to the next page in the url
                                    navigate("/send?id=" + user._id + "&name=" + user.firstName);
                                }
                            }>Send Money</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Users
