// components/FoodList.tsx
"use client";

import { useEffect, useState } from "react";
import { Food } from "../interface/Food";
import { fetchFoods } from "@/lib/services/food/foodService";
import FoodCard from "./food-card";

interface FoodListProps {
  category?: string;
}

const FoodList: React.FC<FoodListProps> = ({ category }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);

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

  useEffect(() => {
    if (category) {
      // Atualize o filtro para buscar a categoria dentro do array categories
      setFilteredFoods(foods.filter((food) => food.categories.includes(category)));
    } else {
      setFilteredFoods(foods);
    }
  }, [foods, category]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:px-24 gap-4 mt-3 px-2">
      {filteredFoods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FoodList;
