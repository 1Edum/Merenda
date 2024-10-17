import { Food } from "@/app/interface/Food";

// Função para buscar alimentos
export const fetchFoods = async () => {
  const response = await fetch("http://localhost/food/listar");
  if (!response.ok) {
    throw new Error("Erro ao buscar os alimentos");
  }
  return response.json();
};

// Função para excluir alimentos
export const deleteFood = async (
  id: number,
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>
) => {
  try {
    const response = await fetch(`http://localhost/food/deletar/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
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

// Função para alternar o status do alimento (ativo/inativo)
export const toggleActiveFood = async (id: number, isActive: boolean) => {
  try {
    const response = await fetch(
      `http://localhost/food/active-true/${isActive ? 0 : 1}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    if (!response.ok) {
      throw new Error("Erro ao alterar o status do alimento");
    }
  } catch (error) {
    console.error("Erro ao alterar o status do alimento:", error);
  }
};

// Função para enviar a quantidade de alimento
export const submitFoodAmount = async (foodId: number, newCount: number) => {
  try {
    const response = await fetch("/food/amount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodId, amount: newCount }),
    });

    if (response.ok) {
      console.log("Quantidade enviada com sucesso!");
    } else {
      console.error("Erro ao enviar a quantidade.");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};
