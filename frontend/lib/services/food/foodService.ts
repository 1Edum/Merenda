import { Food } from "@/app/interface/Food";

export const fetchFoods = async (): Promise<Food[]> => {
  const response = await fetch("http://localhost/food/listar");
  const data = await response.json();
  return data;
};

export const deleteFood = async (id: number, setFoods: React.Dispatch<React.SetStateAction<Food[]>>) => {
  try {
    const response = await fetch(`http://localhost/food/deletar/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setFoods((prevFoods) => prevFoods.filter((food) => food.id !== id));
      console.log("Alimento deletado com sucesso!");
    } else {
      console.error("Erro ao deletar o alimento:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao deletar o alimento:", error);
  }
};

export const toggleActiveFood = async (id: number, isActive: boolean) => {
  try {
    const response = await fetch(`http://localhost/food/active-true/${!isActive}`, { // Inverte o status
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // Apenas envia o ID no corpo
    });

    if (!response.ok) {
      throw new Error("Erro ao alterar o status de ativo");
    }

    console.log("Status de ativo alterado com sucesso!");
  } catch (error) {
    console.error("Erro ao alterar o status de ativo:", error);
  }
};

export const updateFood = async (
  updatedFood: Food,
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>
) => {
  try {
    const response = await fetch(`http://localhost/food/atualizar/${updatedFood.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFood),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar o alimento");
    }

    const data = await response.json();
    setFoods((prevFoods) =>
      prevFoods.map((food) => (food.id === updatedFood.id ? data : food))
    );
    console.log("Alimento atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar o alimento:", error);
  }
};

export const updateFoodCategories = async (
  id: number,
  categories: string[],
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>
) => {
  try {
    const response = await fetch("http://localhost/food/modificar-categorias", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, categories }),
    });

    if (response.ok) {
      const updatedFood = await response.json();
      setFoods((prevFoods) =>
        prevFoods.map((f) => (f.id === updatedFood.id ? updatedFood : f))
      );
      console.log("Categorias atualizadas com sucesso!");
    } else {
      console.error("Erro ao atualizar as categorias do alimento:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao atualizar as categorias do alimento:", error);
  }
};

export const submitFoodAmount = async (userId: number, selectedFoods: any[]) => {
  try {
    const response = await fetch("http://localhost/food/update-amount", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, selectedFoods }), // Inclui userId e a lista de alimentos selecionados no corpo da requisição
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





