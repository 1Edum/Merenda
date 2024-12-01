/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Food } from "@/app/interface/Food";
import { fetchFoods } from "@/lib/services/food/foodService";
import { Card, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { useState, useEffect } from "react";

interface PageTVProps {
  food?: Food; 
}

function PageTV({ food }: PageTVProps) {
  const [foods, setFoods] = useState<Food[]>([]);

  const loadFoods = async () => {
    try {
      const fetchedFoods = await fetchFoods();
      setFoods(fetchedFoods);
    } catch (error) {
      console.error("Erro ao carregar os alimentos:", error);
    }
  };

  useEffect(() => {
    loadFoods(); 
  }, []);

  const activeFoods = foods.filter((food) => !food.active);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:px-24 gap-4 mt-3 px-2">
      {activeFoods.map((food) => (
        <Card key={food.id} className="py-2 px-4 flex flex-col h-full">
          <CardHeader className="flex justify-between items-center mb-3">
            <CardTitle>{food.name}</CardTitle>
          </CardHeader>
          <p className="justify-self-end">Quantidade: {food.amount}</p>
        </Card>
      ))}
    </div>
  );
}

export default PageTV;
