import { useState } from 'react';

interface Food {
  name: string;
  description: string;
  image: string | null;
  category: string;
}

const useAddFood = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const addFood = async (food: Food) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
        const response = await fetch('http://localhost/food/inserir', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(food),
          });

      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao adicionar comida');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return { addFood, loading, error, success };
};

export default useAddFood;
