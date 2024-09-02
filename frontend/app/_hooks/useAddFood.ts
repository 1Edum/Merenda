// hooks/useAddFood.ts
import { useState } from 'react';
import axios from 'axios';
import { Food } from '../interface/FoodData';

const useAddFood = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addFood = async (food: Omit<Food, 'id'>) => {
    setLoading(true);
    try {
      const response = await axios.post('/food/inserir', food);
      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
      setError('Erro ao adicionar comida.');
    } finally {
      setLoading(false);
    }
  };

  return { addFood, loading, error, success };
};

export default useAddFood;
