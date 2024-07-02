import React from 'react'

interface ButtonProps{
    text: String;
}

function Button({text}: ButtonProps) {
  return (
    <div className='border-primary text-primary border w-full py-2 rounded-md'>{text}</div>
  )
}

export default Button