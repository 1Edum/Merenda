// services/foodService.ts
import { Food } from "@/app/interface/Food";

export const fetchFoods = async () => {
  const response = await fetch("http://localhost/food/listar");
  if (!response.ok) {
    throw new Error("Erro ao buscar os alimentos");
  }
  return response.json();
};

export const deleteFood = async (
  id: number,
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>
) => {
  try {
    const response = await fetch(`http://localhost/food/deletar/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // Correção: Tipar corretamente a função callback do setFoods
      setFoods((prevFoods: Food[]) =>
        prevFoods.filter((food) => food.id !== id)
      );
      alert("Alimento excluído com sucesso!");
    } else {
      console.error("Erro ao excluir o alimento:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao excluir o alimento:", error);
  }
};

export const toggleActiveFood = async (id: number, isActive: boolean) => {
  try {
    // O valor de "isActive" aqui indica se o alimento está ativo ou inativo
    const response = await fetch(
      `http://localhost/food/active-true/${isActive ? 0 : 1}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Envia o id do alimento no corpo da requisição
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao alterar o status do alimento");
    }
  } catch (error) {
    console.error("Erro ao alterar o status do alimento:", error);
  }
};

