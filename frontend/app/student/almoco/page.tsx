
import FoodList from '@/app/_components/food-list'
import React from 'react'

function page() {
  return (
    <div className="lg:px-24">
    <FoodList category="Lunch" />
  </div>
  )
}

export default page