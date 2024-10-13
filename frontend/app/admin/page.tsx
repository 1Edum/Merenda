"use client";

import { useEffect, useState } from "react";
import Filter from "../_components/table-infos/filter";
import DialogComponent from "../_components/table-infos/dialog-component";
import { User } from "../interface/User";
import ScrollToTopButton from "../_components/scroll-button";
import { Food } from "../interface/Food";
import { Table } from "../_components/table-infos/table";
import { CheckCircle, Trash2, XCircle } from "lucide-react";
import {
  deleteFood,
  fetchFoods,
  toggleActiveFood,
} from "@/lib/services/food/foodService";
import { fetchUsers, handleExcluirUser } from "@/lib/services/user/userService";
import { TableMobile } from "@/lib/help-mobile/table-mobile";

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [userFilter, setUserFilter] = useState("");

  const [foodFilter, setFoodFilter] = useState("");
  const [foods, setFoods] = useState<Food[]>([]);
  const isMobile = TableMobile();

  // Fetch de usuários
  useEffect(() => {
    fetchUsers(setUsers); // Chama a função para buscar usuários
  }, []);

  // Filtro de usuários
  const handleFilterChangeUser = (filterValue: string) => {
    setUserFilter(filterValue);
  };

  const filteredUsers = users.filter((user) =>
    user.username?.includes(userFilter)
  );

  //Parte Foods
  useEffect(() => {
    const loadFoods = async () => {
      try {
        const fetchedFoods = await fetchFoods(); // Função que busca os alimentos
        setFoods(fetchedFoods); // Define os alimentos no estado
      } catch (error) {
        console.error("Erro ao carregar os alimentos:", error);
      }
    };

    loadFoods(); // Chama a função ao carregar o componente
  }, []);

  const filteredFoods = foods.filter((food) => food.name.includes(foodFilter));

  const excluirAlimento = (id: number) => {
    deleteFood(id, setFoods);
  };

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      await toggleActiveFood(id, !isActive); // Função que altera o status de ativo
      const updatedFoods = await fetchFoods(); // Atualiza a lista de alimentos
      setFoods(updatedFoods);
    } catch (error) {
      console.error("Erro ao alterar o status de ativo:", error);
    }
  };

  const handleFilterChangeFood = (filterValue: string) => {
    setFoodFilter(filterValue);
  };

  return (
    <div className="lg:px-24">
      {/* Seção de usuários */}
      <div className="border rounded-lg my-7" id="adicionarcomida">
        <div className="flex flex-col md:flex-row justify-between pb-4 space-y-2 md:space-y-0">
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
          <Table.Root>
            <Table.Header>
              {(isMobile
                ? ["Nome", "Profissão", "Ações"]
                : ["Nome", "Email", "Profissão", "Ações"]
              ).map((item) => (
                <Table.Cell key={item} textcell={item} />
              ))}
            </Table.Header>
            <Table.Body>
              {filteredUsers.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell textcell={user.username} />
                  {!isMobile && <Table.Cell textcell={user.email} />}
                  <Table.Cell
                    textcell={user.roles.map((role) => role.name).join(", ")}
                  />
                  <Table.Action
                    icon={Trash2}
                    onClick={() => handleExcluirUser(user.id, setUsers)}
                  />
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
      </div>

      {/* Seção de alimentos*/}
      <div className="border rounded-lg my-7" id="adicionarcomida">
        <div className="flex flex-col md:flex-row justify-between pb-4 space-y-2 md:space-y-0">
          <Filter
            textfilter="Filtrar alimentos"
            onFilterChange={handleFilterChangeFood}
          />
          <DialogComponent
            addinfo="Adicionar Alimento"
            descriptioninfo="Preencha as informações do alimento"
            apiEndpoint="http://localhost/food/inserir"
            fields={[
              { type: "text", name: "imageUrl", placeholder: "URL da Imagem" },
              { type: "text", name: "name", placeholder: "Nome do Alimento" },
              {
                type: "select",
                name: "category",
                placeholder: "Selecione a Categoria",
                options: ["líquido", "sólido"],
              },
              { type: "number", name: "calories", placeholder: "Calorias" },
              {
                type: "text",
                name: "nutritionalValue",
                placeholder: "Valor Nutricional",
              },
            ]}
          />
        </div>
        <Table.Root>
          <Table.Header>
            {(isMobile
              ? ["Nome", "Ativo", "Quantia"]
              : [
                  "Imagem",
                  "Nome",
                  "Categoria",
                  "Calorias",
                  "Valor Nutricional",
                  "Ativo",
                  "Ações",
                  "Quantidade"
                ]
            ).map((item) => (
              <Table.Cell key={item} textcell={item} />
            ))}
          </Table.Header>
          <Table.Body>
            {filteredFoods.map((food) => (
              <Table.Row key={food.id}>
                {!isMobile && (
                <Table.Cell>
                  <Table.Image src={food.imageUrl} alt={food.name} />
                </Table.Cell>
                )}
                <Table.Cell textcell={food.name} />
                {!isMobile && (
                  <>
                    <Table.Cell textcell={food.category} />
                    <Table.Cell textcell={food.calories.toString()} />
                    <Table.Cell textcell={food.nutritionalValue.toString()} />
                  </>
                )}
                <Table.Action
                  icon={food.active ? XCircle : CheckCircle}
                  onClick={() => handleToggleActive(food.id, food.active)}
                />
                {!isMobile && (
                <Table.Action
                  icon={Trash2}
                  onClick={() => excluirAlimento(food.id)}
                />
              )}
                <Table.Cell textcell={food.amount.toString()} />
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>

      <ScrollToTopButton />
    </div>
  );
}
