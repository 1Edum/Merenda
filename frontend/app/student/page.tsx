"use client";

import { useState, useEffect } from "react";
import { Food } from "../interface/Food";
import { fetchFoods } from "@/lib/services/food/foodService"; // fetchFoods para buscar os alimentos
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "../_components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../_components/ui/dialog";

function Page() {
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
        <Card key={food.id} className="py-2 px-4">
          <CardHeader className="flex justify-between items-center mb-3">
              <CardTitle>{food.name}</CardTitle>
              <Dialog>
                <DialogTrigger className="flex flex-col gap-[2px]">
                  <div className="w-1 h-1 bg-primary rounded-full" />
                  <div className="w-1 h-1 bg-primary rounded-full" />
                  <div className="w-1 h-1 bg-primary rounded-full" />
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                  <DialogTitle>Informações sobre {food.name}</DialogTitle>
                </DialogHeader>
                  <h1>Valor Nutricional : {food.nutritionalValue.toString()}</h1>
                  <h1>Calorias (100g) : {food.calories.toString()}</h1>
                </DialogContent>
              </Dialog>
          </CardHeader>
          <Image src={food.imageUrl} alt={food.name} width={100} height={100} />
        </Card>

          ))}
    </div>
  );
}

export default Page;