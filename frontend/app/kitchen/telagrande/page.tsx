/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Food } from "@/app/interface/Food";
import { fetchFoods } from "@/lib/services/food/foodService"; // fetchFoods para buscar os alimentos
import Image from "next/image";
import { Dialog } from "@radix-ui/react-dialog";
import { Card, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/_components/ui/dialog";
import { useState, useEffect } from "react";


function page() {

  const [foods, setFoods] = useState<Food[]>([]);
  useEffect(() => {
    const loadFoods = async () => {
      try {
        const fetchedFoods = await fetchFoods();
        setFoods(fetchedFoods);
      } catch (error) {
        console.error("Erro ao carregar os alimentos:", error);
      }
    };
    loadFoods();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:px-24 gap-4 mt-3 px-2">
      {foods.map((food) => (
        <Card key={food.id} className="py-2 px-4 flex flex-col h-full">
          <CardHeader className="flex justify-between items-center mb-3">
              <CardTitle>{food.name}</CardTitle>
          </CardHeader>
          <p className="justify-self-end">Quantidade: {food.amount}</p>
        </Card>

          ))}
    </div>
  )
}

export default page