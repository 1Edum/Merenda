"use client"

import { useState, useEffect } from 'react';

interface Food {
  id: number; // Assumindo que o ID é numérico, ajuste conforme a sua API
  nome: string;
  descricao: string;
}

const ListarFoods = () => {
  const [foods, setFoods] = useState<Food[]>([]); // Inicializa como um array vazio de Food
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost/food/listar');
        if (response.ok) {
          const data = await response.json();
          setFoods(data); // Aqui espera-se que 'data' seja um array de objetos com as propriedades nome, descricao e id
        } else {
          console.error('Erro ao listar foods:', response.status);
        }
      } catch (error) {
        console.error('Erro ao comunicar com o servidor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2>Listagem de Foods</h2>
      {foods.length === 0 ? (
        <p>Nenhum food encontrado.</p>
      ) : (
        <ul>
          {foods.map((food) => (
            <li key={food.id}>
              <strong>{food.nome}</strong>: {food.descricao}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListarFoods;
