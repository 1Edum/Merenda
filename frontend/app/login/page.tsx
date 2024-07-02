import React from 'react'
import Input from '../_components/input'
import Button from '../_components/button'

function page() {
  return (
    <main className='flex justify-center items-center w-full h-[80vh]'>
        <div className='bg-secondary p-3 flex flex-col gap-8'>
            <h1 className='text-primary text-5xl text-center'>Login</h1>
            <Input text={"Email"} />
            <Input text={"Senha"} />
            <Button text={"Entrar"}/>
        </div>
    </main>
  )
}

export default page