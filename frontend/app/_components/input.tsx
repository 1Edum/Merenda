import React from 'react'

interface InputProps{
    height?: String;
    text: String
}

function Input({text, height}: InputProps) {
  return (
    <div>
        <label>{text}</label>
        <input type="text" className={`${height} border-primary text-primary border w-full py-1 rounded-md bg-transparent`} />
    </div>
  )
}

export default Input

