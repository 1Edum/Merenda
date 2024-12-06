"use client";

import { useState } from "react";

interface IncrementDecrementProps {
  foodId: number;
  onAmountChange: (foodId: number, newAmount: number) => void;
}

const IncrementDecrement: React.FC<IncrementDecrementProps> = ({ foodId, onAmountChange }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    if (count < 2) { // Verifica se o valor é menor que 2
      setCount(count + 1);
      onAmountChange(foodId, count + 1); // Chama onAmountChange para atualizar o estado do pai
    }
  };

  const handleDecrement = () => {
    if (count > 0) { // Permite decrementar se o valor for maior que 0
      setCount(count - 1);
      onAmountChange(foodId, count - 1); // Chama onAmountChange para atualizar o estado do pai
    }
  };

  return (
    <div className="flex justify-between border w-full rounded-full mt-2">
      <div className="w-1/3 bg-red-500 rounded-full text-center text-white cursor-pointer" onClick={handleDecrement}>-</div>
      <div>{count}</div>
      <div className="w-1/3 bg-red-500 rounded-full text-center text-white cursor-pointer" onClick={handleIncrement}>+</div>
    </div>
  );
};

export default IncrementDecrement;
