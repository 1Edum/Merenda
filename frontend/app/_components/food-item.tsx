"use client"

import { useState } from 'react';

const InserirFood = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newFood = {
      nome: nome,
      descricao: descricao,
    };

    try {
      const response = await fetch('http://localhost/food/inserir', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFood)
      });

      if (response.ok) {
        console.log('Food inserido com sucesso!');
        // Lógica adicional após a inserção bem-sucedida, se necessário
      } else {
        console.error('Erro ao inserir food:', response.status);
      }
    } catch (error) {
      console.error('Erro ao comunicar com o servidor:', error);
    }
  };

  return (
    <div>
      <h2>Inserir Food</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <br />
        <label>
          Descrição:
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </label>

        <button type="submit">Inserir</button>
      </form>
    </div>
  );
};

export default InserirFood;
