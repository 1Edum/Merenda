import React, { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'>{
    text: String
}

function Input(props: InputProps) {
  return (
    <div>
        <label>{props.text}</label>
        <input type="text" className='border-primary border w-full py-1 rounded-md bg-transparent' />
    </div>
  )
}

export default Input

