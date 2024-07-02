import React from 'react'
import Link from 'next/link'
import Button from './button'

export default function Banner() {
  return (
    <div className='bg-secondary text-center p-5 '>
        <h1 className='text-4xl uppercase font-semibold py-3'>Sesi Merenda</h1>
        <p>Plataforma de apoio à alimentação para alunos e
        cozinheiros do SESI.</p>
        <div className='py-4 flex flex-col gap-3'>
          <Link href={"/login"}>
            <Button text="Entrar"/>
          </Link>
          <Link href={"/cadastrar"}>
            <Button text="Ainda não é aluno?"/>
          </Link>
        </div>
    </div>
  )
}
