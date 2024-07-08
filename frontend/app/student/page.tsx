import React from 'react'
import FoodItem from '../_components/food-item'

function page() {
  return (
    <div  className='p-2'>
      <h3>Café da Manhã</h3>
        <FoodItem category='cafe-manha' />
      <h3>Almoço</h3>
        <FoodItem category='almoco' />
      <h3>Café da Tarde</h3>
        <FoodItem category='cafe-tarde' />


    </div>
  )
}

export default page