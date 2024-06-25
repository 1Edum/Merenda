import React from 'react'

export default function Card() {
  return (
    <div className='bg-secondary text-center p-5 '>
        <h1 className='text-4xl uppercase font-semibold py-3'>Sesi Merenda</h1>
        <p>Plataforma de apoio à alimentação para alunos e
        cozinheiros do SESI.</p>
        <div className='py-4'>
        <button className='border-primary text-primary border w-full py-3 rounded-md'>Ainda não é aluno?</button>

        </div>
    </div>
  )
}
