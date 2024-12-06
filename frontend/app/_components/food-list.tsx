"use client";

import { useEffect, useState } from "react";
import { Food } from "../interface/Food";
import { fetchFoods } from "@/lib/services/food/foodService";
import FoodCard from "./food-card";
import { Button } from "./ui/button";
import { submitFoodAmount } from "@/lib/services/food/foodService";

interface FoodListProps {
  category?: string;
}

const FoodList: React.FC<FoodListProps> = ({ category }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [amounts, setAmounts] = useState<{[key: number]: number}>({});
  // Add a loading state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const fetchedFoods = await fetchFoods();
        setFoods(fetchedFoods);
        const initialAmounts: { [key: number]: number } = {};
        fetchedFoods.forEach(food => initialAmounts[food.id] = 0);
        setAmounts(initialAmounts);
      } catch (error) {
        console.error("Erro ao carregar os alimentos:", error);
      }
    };
    loadFoods();
  }, []);

  useEffect(() => {
    if (category) {
      setFilteredFoods(foods.filter((food) => food.categories.includes(category)));
    } else {
      setFilteredFoods(foods);
    }
  }, [foods, category]);

  const handleAmountChange = (foodId: number, newAmount: number) => {
    setAmounts((prevAmounts) => ({ ...prevAmounts, [foodId]: newAmount }));
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Set loading to true before submitting
    try {
      for (const foodId in amounts) {
        const amount = amounts[parseInt(foodId)];
        if (amount > 0) {
          await submitFoodAmount(parseInt(foodId), amount);
        }
      }
    } catch (error) {
      console.error("Erro ao enviar as quantidades:", error);
      // Handle error appropriately (e.g., display an error message)
    } finally {
      setIsLoading(false); // Set loading to false after submitting (success or failure)
    }
  };

  return (
    <div className="lg:px-24 gap-4 mt-3 px-2">
      <div className="grid grid-cols-2 md:grid-cols-3">
        {filteredFoods.map((food) => (
          <FoodCard key={food.id} food={food} onAmountChange={handleAmountChange} />
        ))}
      </div>
      {/* Disable the button while loading */}
      <Button onClick={handleSubmit} disabled={isLoading}>Enviar</Button>
    </div>
  );
};

export default FoodList;