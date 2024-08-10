import React from 'react'
import Input from '../_components/input'
import Button from '../_components/button'

function page() {
  return (
    <main className='flex justify-center items-center w-full h-[80vh]'>
        <div className='bg-secondary px-4 py-7 flex flex-col gap-8 w-72 md:w-96'>
            <h1 className='text-5xl text-center'>Login</h1>
            <Input text={"Email"} />
            <Input text={"Senha"} />
            <Button>Entrar</Button>
        </div>
    </main>
  )
}

export default page