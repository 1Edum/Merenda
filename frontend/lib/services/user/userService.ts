// services/userService.ts
import { User } from "@/app/interface/User";

export const fetchUsers = async (setUsers: (users: User[]) => void, setLoading: (loading: boolean) => void) => {
  try {
    const response = await fetch("http://localhost/user/listar");
    const data = await response.json();
    setUsers(data);
  } catch (error) {
    console.error("Erro ao buscar os usuários:", error);
  } finally {
    setLoading(false);
  }
};

export const handleExcluirUser = async (id: number, setUsers: React.Dispatch<React.SetStateAction<User[]>>) => {
    try {
      const response = await fetch(`http://localhost/user/deletar/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Garantindo que prevUsers seja do tipo User[]
        setUsers((prevUsers: User[]) => prevUsers.filter((user) => user.id !== id));
        alert("Usuário excluído com sucesso!");
      } else {
        console.error("Erro ao excluir o usuário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };