"use client";

import Filter from "../_components/table-infos/filter";
import DialogComponent from "../_components/table-infos/dialog-component";
import { Table } from "../_components/table-infos/table";
import { useState, useEffect } from "react";
import { Food } from "../interface/Food";
import { deleteFood, fetchFoods } from "@/lib/services/food/foodService"; // fetchFoods para buscar os alimentos
import Image from "next/image";
import { Trash2 } from "lucide-react";
import ScrollToTopButton from "../_components/scroll-button";

function Page() {
  const [foodFilter, setFoodFilter] = useState("");
  const [foods, setFoods] = useState<Food[]>([]);

  // Função para buscar alimentos na API
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

  const handleFilterChangeFood = (filterValue: string) => {
    setFoodFilter(filterValue);
  };

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
              { type: "text", name: "imageUrl", placeholder: "URL da Imagem" },
              { type: "text", name: "name", placeholder: "Nome do Alimento" },
              { type: "text", name: "category", placeholder: "Categoria" },
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
            {titles.map((item) => (
              <Table.Cell key={item.name} textcell={item.name} />
            ))}
          </Table.Header>
          <Table.Body>
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food) => (
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
                      onClick={() => excluirAlimento(food.id)}
                    />
                  </Table.Actions>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell textcell="Nenhum alimento encontrado" />
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default Page;
