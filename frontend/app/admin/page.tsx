"use client";

import { useEffect, useState } from "react";
import Filter from "../_components/table-infos/filter";
import DialogComponent from "../_components/table-infos/dialog-component";
import { User } from "../interface/User";
import ScrollToTopButton from "../_components/scroll-button";
import { Food } from "../interface/Food";
import { Table } from "../_components/table-infos/table";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [userFilter, setUserFilter] = useState("");
  const [foodFilter, setFoodFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch de usuários
  useEffect(() => {
    const fetchUsers = async () => {
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

    fetchUsers();
  }, []);

  const handleExcluirUser = async (id: number) => {
    try {
      const response = await fetch(`http://localhost/user/deletar/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        alert("Usuário excluído com sucesso!");
      } else {
        console.error("Erro ao excluir o usuário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };

  const handleExcluirFood = async (id: number) => {
    try {
      const response = await fetch(`http://localhost/food/deletar/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setFoods((prevFoods) => prevFoods.filter((food) => food.id !== id)); // Corrigido para setFoods
        alert("Alimento excluído com sucesso!");
      } else {
        console.error("Erro ao excluir o alimento:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir o alimento:", error);
    }
  };

  // Fetch de alimentos
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch("http://localhost/food/listar");
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error("Erro ao buscar os alimentos:", error);
      }
    };

    fetchFoods();
  }, []);

  // Filtro de usuários
  const handleFilterChangeUser = (filterValue: string) => {
    setUserFilter(filterValue);
  };

  const filteredUsers = users.filter((user) =>
    user.username?.includes(userFilter)
  );

  // Filtro de alimentos
  const handleFilterChangeFood = (filterValue: string) => {
    setFoodFilter(filterValue);
  };

  
  const filteredFoods = foods.filter((food) => food.name.includes(foodFilter));

  const titles = [
    { name: "Imagem" },
    { name: "Nome" },
    { name: "Categoria" },
    { name: "Calorias (100g)" },
    { name: "Valor Nutricional" },
    { name: "Ações" },
  ];

  return (
    <div className="lg:px-24">
      {/* Seção de usuários */}
      <div className="border rounded-lg my-7" id="adicionarusuario">
        <div className="flex justify-between pb-7">
          <Filter
            textfilter="Filtrar usuários"
            onFilterChange={handleFilterChangeUser}
          />
          <DialogComponent
            addinfo="Adicionar Usuário"
            descriptioninfo="Preencha as informações do usuário"
            apiEndpoint="http://localhost/user/inserir"
            fields={[
              { type: "text", name: "username", placeholder: "Nome" },
              { type: "text", name: "email", placeholder: "Email" },
              { type: "password", name: "password", placeholder: "Senha" },
              {
                type: "select",
                name: "role",
                placeholder: "Selecione uma função",
                options: ["STUDENT", "KITCHEN", "ADMIN"],
              },
            ]}
          />
        </div>
        {loading ? (
          <p>Carregando usuários...</p>
        ) : (
          <Table.Root>
            <Table.Header>
              {["Nome", "Email", "Profissão", "Ações"].map((item) => (
                <Table.Cell key={item} textcell={item} />
              ))}
            </Table.Header>
            <Table.Body>
              {filteredUsers.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell textcell={user.username} />
                  <Table.Cell textcell={user.email} />
                  <Table.Cell
                    textcell={user.roles.map((role) => role.name).join(", ")}
                  />
                  <Table.Actions>
                    <Table.Action
                      icon={Trash2}
                      onClick={() => handleExcluirUser(user.id)}
                    />
                  </Table.Actions>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </div>

      {/* Seção de alimentos*/} 
      <div className="border rounded-lg my-7" id="adicionarcomida">
        <div className="flex justify-between pb-7">
          <Filter
            textfilter="Filtrar alimentos"
            onFilterChange={handleFilterChangeFood}
          />
          <DialogComponent
            addinfo="Adicionar Alimento"
            descriptioninfo="Preencha as informações do alimento"
            apiEndpoint="http://localhost/food/inserir"
            fields={[
              { type: 'text', name: 'imageUrl', placeholder: 'URL da Imagem' },
              { type: 'text', name: 'name', placeholder: 'Nome do Alimento' },
              { type: 'text', name: 'category', placeholder: 'Categoria' },
              { type: 'number', name: 'calories', placeholder: 'Calorias' },
              { type: 'text', name: 'nutritionalValue', placeholder: 'Valor Nutricional' },
            ]}
          />
        </div>
        <Table.Root>
          <Table.Header>
            {titles.map((item) => (
              <Table.Cell key={item.name} textcell={item.name} />
            ))}
          </Table.Header>
          <Table.Body>
            {filteredFoods.map((food) => (
              <Table.Row key={food.id}>
                <Table.Cell>
                <Image
                      src={food.imageUrl}
                      alt={food.name}
                      width={100}
                      height={100}
                    />
                </Table.Cell>
                <Table.Cell textcell={food.name} />
                <Table.Cell textcell={food.category} />
                <Table.Cell textcell={food.calories.toString()} />
                <Table.Cell textcell={food.nutritionalValue.toString()} />
                <Table.Actions>
                  <Table.Action
                    icon={Trash2}
                    onClick={() => handleExcluirFood(food.id)}
                  />
                </Table.Actions>
               
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
      
      <ScrollToTopButton />
    </div>
  );
}
