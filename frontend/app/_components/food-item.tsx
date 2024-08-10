// components/FoodItem.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import useFetchFoods from '../_hooks/useFetchFoods';

interface FoodItemProps {
  category?: string;
  bg: string;
  text: string;
}

const FoodItem: React.FC<FoodItemProps> = ({ category, bg, text }) => {
  const { foods, loading, error } = useFetchFoods();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-zinc-200 h-64 text-white p-2"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Erro: {error}</div>;
  }

  const filteredFoods = category 
    ? foods.filter(food => food.category === category)
    : foods;

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
      {filteredFoods.map(food => (
        <li key={food.id} className="bg-zinc-400 h-64 md:h-80 text-white p-2 rounded-md">
          <div className="w-full h-1/3 md:h-2/3">
            <Image 
              src={food.image}
              alt={food.name}
              className="dark:invert w-full h-full object-cover rounded-md"
              width={100}
              height={20}
              priority
              quality={100}
            />
          </div>
          <div className="h-2/3 md:h-1/3 flex flex-col">
            <h2 className="text-xl h-20">{food.name}</h2>
            <p className="text-xs break-words h-36">{food.description}</p>
            <button className={`${bg} w-full rounded-md`}>{text}</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FoodItem;
