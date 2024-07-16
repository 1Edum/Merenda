// hooks/useFetchFoods.ts
import { useState, useEffect } from 'react';
import { Food } from '../interface/FoodData';

const useFetchFoods = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost/food/listar');
        if (response.ok) {
          const data: Food[] = await response.json();
          setFoods(data);
        } else {
          throw new Error(`Erro ao listar foods: ${response.status}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Erro desconhecido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return { foods, loading, error };
};

export default useFetchFoods;
