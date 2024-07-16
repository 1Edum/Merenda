import React, { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'>{
    children: string;
}

function Button(props: ButtonProps) {
  return (
    <button {...props} className='border-primary text-primary border w-full py-2 rounded-md text-center'>
      {props.children}
    </button>
    
  )
}

export default Button