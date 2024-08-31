// components/FoodItem.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import useFetchFoods from '../_hooks/useFetchFoods';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from './ui/card';

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
<div className="grid grid-cols-2  md:grid-cols-4 gap-4">
  {filteredFoods.map(food => (
    <Card key={food.id} className="bg-zinc-400 h-64 md:h-80 text-white p-2 rounded-md flex flex-col">
      <CardContent className="w-full">
        <Image 
          src={food.image}
          alt={food.name}
          className="w-full h-28 sm:h-36 md:h-48 bg-red-800 rounded-md"
          width={100}
          height={20}
          priority
          quality={100}
        />
      </CardContent>
      <CardHeader className="flex flex-col h-full ">
        <CardTitle className="text-xl">{food.name}</CardTitle>
        <button className={`${bg} rounded-md mt-auto`}>{text}</button>
      </CardHeader>
    </Card>
  ))}
</div>


  );
};

export default FoodItem;
