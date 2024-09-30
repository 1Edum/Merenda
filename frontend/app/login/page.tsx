import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import React from 'react'

function page() {
  return (
    <main className='flex justify-center items-center w-full h-[80vh]'>
        <div className='border rounded-lg px-4 py-7 flex flex-col gap-8 w-72 md:w-96'>
            <h1 className='text-5xl text-center'>Login</h1>
            <div>
              <label>Email</label>
              <Input />
            </div>
            <div>
              <label>Senha</label>
              <Input />
            </div>
            <Button variant={"destructive"}>Entrar</Button>
        </div>
    </main>
  )
}

export default page