"use client";

import { useState } from "react";
import { Food } from "../interface/Food";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "../_components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../_components/ui/dialog";
import IncrementDecrement from "../_components/increment-decrement";

interface FoodCardProps {
  food: Food;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  // Exibe o card apenas se o alimento estiver ativo
  if (food.active) return null;

  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <Card className="py-2 px-4">
      <CardHeader className="flex justify-between items-center mb-3">
        <CardTitle>{food.name}</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex flex-col gap-[2px]">
              <div className="w-1 h-1 bg-primary rounded-full" />
              <div className="w-1 h-1 bg-primary rounded-full" />
              <div className="w-1 h-1 bg-primary rounded-full" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Informações sobre {food.name}</DialogTitle>
            </DialogHeader>
            <h1>Valor Nutricional: {food.nutritionalValue.toString()}</h1>
            <h1>Calorias (100g): {food.calories.toString()}</h1>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <Image src={food.imageUrl} className="w-28 h-28" alt={food.name} width={100} height={100} />
      <IncrementDecrement foodId={food.id} initialCount={0} />
    </Card>
  );
};

export default FoodCard;
