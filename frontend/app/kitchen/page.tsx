import React from 'react'
import FoodItem from '../_components/food-item'

function page() {
  return (
    <div className='p-2 flex flex-col gap-y-2'>
        <FoodItem bg='bg-green-400' text='Ativo'/>
    </div>
  )
}

export default page