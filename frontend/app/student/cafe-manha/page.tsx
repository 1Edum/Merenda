
import FoodItem from '@/app/_components/food-item'
import React from 'react'

function page() {
  return (
    <div  className='p-2'>
      <h3>Café da Manhã</h3>
      <FoodItem category='cafe-manha' />
    </div>
  )
}

export default page