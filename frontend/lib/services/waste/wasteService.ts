import { Waste } from "@/app/interface/Waste";

const API_URL = "http://localhost/waste";

export async function fetchWastes(): Promise<Waste[]> {
  try {
    const response = await fetch(`${API_URL}/listar`);
    if (!response.ok) throw new Error("Erro ao buscar desperdícios");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addWaste(wasteData: Omit<Waste, "id">): Promise<Waste> {
  try {
    const response = await fetch(`${API_URL}/inserir`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wasteData),
    });
    if (!response.ok) throw new Error("Erro ao adicionar desperdício");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Função para excluir um desperdício pelo ID
export async function deleteWaste(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/deletar/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao excluir desperdício");
  } catch (error) {
    console.error(error);
    throw error;
  }
}
