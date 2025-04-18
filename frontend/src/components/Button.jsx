import React from 'react'

const Button = ({ text, className }) => {
    return (
        <button className={`bg-black hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded ${className}`}>
            {text}
        </button>
    )
}

export default Button
