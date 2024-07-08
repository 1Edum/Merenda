'use client';

import React, { useEffect, useState } from 'react';
import { Food } from '../interface/FoodData';
import Image from 'next/image';

interface FoodItemProps {
  category?: string;
}

const FoodItem: React.FC<FoodItemProps> = ({ category }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost/food/listar');
        if (response.ok) {
          const data: Food[] = await response.json();
          setFoods(data);
        } else {
          console.error('Erro ao listar foods:', response.status);
        }
      } catch (error) {
        console.error('Erro ao comunicar com o servidor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return <>

        <div className='grid grid-cols-2 gap-4'>
          <div  className='bg-zinc-200 h-64 text-white p-2'></div>
          <div  className='bg-zinc-200 h-64 text-white p-2'></div>
          <div  className='bg-zinc-200 h-64 text-white p-2'></div>
          <div  className='bg-zinc-200 h-64 text-white p-2'></div>
        </div>

    </>;
  }

  const filteredFoods = category 
    ? foods.filter(food => food.category === category)
    : foods;

  return (
    <ul className='grid grid-cols-2 gap-4'>
    {filteredFoods.map(food => (
      <li key={food.id} className='bg-zinc-400 h-64 text-white p-2 rounded-md'>
        <div className='w-full h-1/3'>
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
        <div className='h-2/3 flex flex-col'>

        <h2 className='text-xl h-20'>{food.name}</h2>
        <p className='text-xs break-words h-36'>{food.description}</p>

        <button className='bg-green-400 rounded-lg w-full justify-self-end'>Quero</button>
        </div>
      </li>
    ))}
  </ul>
  );
};

export default FoodItem;

/**
  <div className='flex items-center justify-center'>
      <ul className='grid grid-cols-2 gap-4 '>
        {filteredFoods.map(food => (
          <li key={food.id} className='bg-zinc-400 h-full text-white p-2'>
            <div className='w-full h-1/3'>
            <Image 
              src={food.image}
              alt={food.name}
              className="dark:invert w-full h-full object-cover"
              width={100}
              height={20}
              priority
              quality={100}
            />
            </div>
            <h2 className='text-xl h-20'>{food.name}</h2>
            <p className='text-sm break-words h-24'>{food.description}</p>

            <button className='bg-green-400 rounded-lg w-full justify-self-end'>Quero</button>
          </li>
        ))}
      </ul>
    </div>
 */
