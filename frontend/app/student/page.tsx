import React from 'react'
import FoodItem from '../_components/food-item'

function page() {
  return (
    <div className='p-2 flex flex-col gap-y-2'>
      <h3>Café da Manhã</h3>
        <FoodItem bg='bg-green-400' text='Quero' category='cafe-manha' />
      <h3>Almoço</h3>
        <FoodItem bg='bg-green-400' text='Quero' category='almoco' />
      <h3>Café da Tarde</h3>
        <FoodItem bg='bg-green-400' text='Quero' category='cafe-tarde' />


    </div>
  )
}

export default page