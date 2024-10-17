import { useState } from "react";
import { submitFoodAmount } from "@/lib/services/food/foodService"; // Importar a função de envio de quantidade

const IncrementDecrement = ({ foodId, initialCount }: { foodId: number, initialCount: number }) => {
  const [count, setCount] = useState(initialCount || 0);

  const handleIncrement = () => {
    if (count < 2) {
      setCount(count + 1);
      submitFoodAmount(foodId, count + 1); // Usar a função do serviço para enviar o valor
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      submitFoodAmount(foodId, count - 1); // Usar a função do serviço para enviar o valor
    }
  };

  return (
    <div className="flex justify-between border w-full rounded-full mt-2">
      <div
        className="w-1/3 bg-red-500 rounded-full text-center text-white cursor-pointer"
        onClick={handleDecrement}
      >
        -
      </div>
      <div>{count}</div>
      <div
        className="w-1/3 bg-red-500 rounded-full text-center text-white cursor-pointer"
        onClick={handleIncrement}
      >
        +
      </div>
    </div>
  );
};

export default IncrementDecrement;
