"use client";

import { useEffect, useState } from "react";
import Filter from "../_components/table-infos/filter";
import DialogComponent from "../_components/table-infos/dialog-component";
import { User } from "../interface/User";

import ScrollToTopButton from "../_components/scroll-button";

import { Food } from "../interface/Food";
import { Table } from "../_components/table-infos/table/table";
import { Trash2 } from "lucide-react";

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [foods, setFoods] = useState<Food[]>([]); // Ajuste o tipo para Food
  const [userFilter, setUserFilter] = useState(""); // Estado separado para filtrar usuários
  const [foodFilter, setFoodFilter] = useState(""); // Estado separado para filtrar alimentos

  // Fetch de usuários
  useEffect(() => {
    fetch("http://localhost/user/listar")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os usuários:", error);
      });
  }, []);

  const handleExcluirUser = (id: number) => {
    fetch(`http://localhost/user/deletar/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== id));
        } else {
          console.error("Erro ao excluir o usuário:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir o usuário:", error);
      });
  };

  // Fetch de alimentos
  useEffect(() => {
    fetch("http://localhost/food/listar")
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os Alimentos:", error);
      });
  }, []);

  // Filtro de usuários
  const handleFilterChangeUser = (filterValue: string) => {
    setUserFilter(filterValue);
  };

  const excluirUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter((user) => user.email.includes(userFilter));

  // Filtro de alimentos
  const handleFilterChangeFood = (filterValue: string) => {
    setFoodFilter(filterValue);
  };

  const filteredFoods = foods.filter((food) => food.name.includes(foodFilter));

  const titles = [
    { name: "Nome" },
    { name: "Categoria" },
    { name: "Calorias (100g)" },
    { name: "Valor Nutricional" },
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
              { type: "text", name: "name", placeholder: "Nome" },
              { type: "text", name: "email", placeholder: "Email" },
              { type: "password", name: "password", placeholder: "Senha" },
              {
                type: "select",
                name: "role",
                placeholder: "Selecione uma função",
                options: ["Estudante", "Cozinheiro", "Administrador"],
              },
              {
                type: "select",
                name: "classRoom",
                placeholder: "Selecione uma sala de aula",
                options: ["1 Ano A", "2 Ano B", "3 Ano C"],
              },
            ]}
          />
        </div>
        <Table.Root>
          <Table.Header>
            {["Nome", "Email", "Profissão", "Ações"].map((item) => (
              <Table.Cell key={item} textcell={item} />
            ))}
          </Table.Header>
          <Table.Body>
            {filteredUsers.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell textcell={user.name} />
                <Table.Cell textcell={user.email} />
                <Table.Cell
                  textcell={user.roles.map((role) => role.name).join(", ")}
                />
                <Table.Actions>
                  <Table.Action icon={Trash2} onClick={() => handleExcluirUser(user.id)}/>
                </Table.Actions>
                
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>

      {/* Seção de alimentos */}
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
              { type: 'text', name: 'name', placeholder: 'Nome do Alimento' },
              { type: 'text', name: 'calories', placeholder: 'Calogorias (100g)' },
              { type: 'text', name: 'nutritionalValue', placeholder: 'Valor Nutricional' },
              {
                type: "select",
                name: "category",
                placeholder: "Selecione uma categoria",
                options: ["Sólido", "Líquido"],
              },
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
                <Table.Cell textcell={food.name} />
                <Table.Cell textcell={food.category} />
                <Table.Cell textcell={food.calories.toString()} />
                <Table.Cell textcell={food.nutritionalValue.toString()} />
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>

      <ScrollToTopButton />
    </div>
  );
}
