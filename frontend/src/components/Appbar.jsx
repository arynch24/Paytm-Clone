import axios from 'axios'
import React, { useEffect } from 'react'

const Appbar = () => {
    // useEffect(
    //     () => {
    //         const res = axios.put('http://localhost:3000/api/v1/user', {

    //         })
    //     }
    // )
    return (
        <div className='h-10 flex justify-between py-2 px-4 border-b-1 font-semibold'>
            <div>Paytm App</div>
            <div>Hello </div>
        </div>
    )
}

export default Appbar
