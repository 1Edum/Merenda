import React from 'react'
import Button from './Button'

export default function Banner() {
  return (
    <div className='bg-secondary text-center p-5 '>
        <h1 className='text-4xl uppercase font-semibold py-3'>Sesi Merenda</h1>
        <p>Plataforma de apoio à alimentação para alunos e
        cozinheiros do SESI.</p>
        <div className='py-4 flex flex-col gap-3'>
        <Button text="Entrar"/>
        <Button text="Ainda não é aluno?"/>
        </div>
    </div>
  )
}
