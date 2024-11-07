"use client";

import { useEffect, useState } from "react";
import { Food } from "../interface/Food";
import { Table } from "../_components/table-infos/table";
import { CheckCircle, Trash2, XCircle } from "lucide-react";
import { fetchFoods, deleteFood, toggleActiveFood } from "@/lib/services/food/foodService";
import Filter from "../_components/table-infos/filter";
import DialogComponent from "../_components/table-infos/dialog-component";
import { TableMobile } from "@/lib/help-mobile/table-mobile";

const FoodSection = () => {
  const [foodFilter, setFoodFilter] = useState("");
  const [foods, setFoods] = useState<Food[]>([]);
  const isMobile = TableMobile();

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const fetchedFoods = await fetchFoods();
        setFoods(fetchedFoods);
      } catch (error) {
        console.error("Erro ao carregar os alimentos:", error);
      }
    };

    loadFoods();
  }, []);

  const filteredFoods = foods.filter((food) => food.name.includes(foodFilter));

  const excluirAlimento = (id: number) => {
    deleteFood(id, setFoods);
  };

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      await toggleActiveFood(id, !isActive);
      const updatedFoods = await fetchFoods();
      setFoods(updatedFoods);
    } catch (error) {
      console.error("Erro ao alterar o status de ativo:", error);
    }
  };

  const handleFilterChangeFood = (filterValue: string) => {
    setFoodFilter(filterValue);
  };

  return (
    <div className="border rounded-lg my-7" id="adicionarcomida">
      <div className="flex flex-col md:flex-row justify-between pb-4 space-y-2 md:space-y-0">
        <Filter textfilter="Filter food" onFilterChange={handleFilterChangeFood} />
        <DialogComponent
          addinfo="Add Food"
          descriptioninfo="Fill in the food information"
          apiEndpoint="http://localhost/food/inserir"
          menuCategory={true}
          fields={[
            { type: "text", name: "imageUrl", placeholder: "Image URL" },
            { type: "text", name: "name", placeholder: "Food Name" },
            { type: "select", name: "category", placeholder: "Select Category", options: ["Breakfast", "Lunch", "Afternoon Coffee"] },
            { type: "number", name: "calories", placeholder: "Calories" },
            { type: "text", name: "nutritionalValue", placeholder: "Nutritional Value" },
          ]}
        />
      </div>
      <Table.Root>
        <Table.Header>
          {(isMobile
            ? ["Name", "Asset", "Amount"]
            : ["Image", "Name", "Category", "Calories", "Nutritional Value", "Active", "Shares", "Quantity"]
          ).map((item) => (
            <Table.Cell key={item} textcell={item} />
          ))}
        </Table.Header>
        <Table.Body>
          {filteredFoods.map((food) => (
            <Table.Row key={food.id}>
              {!isMobile && <Table.Cell><Table.Image src={food.imageUrl} alt={food.name} /></Table.Cell>}
              <Table.Cell textcell={food.name} />
              {!isMobile && <>
                <Table.Cell textcell={food.categories.join(", ")} />
                <Table.Cell textcell={food.calories.toString()} />
                <Table.Cell textcell={food.nutritionalValue} />
              </>}
              <Table.Action
                icon={food.active ? XCircle : CheckCircle}
                onClick={() => handleToggleActive(food.id, food.active)}
              />
              {!isMobile && <Table.Action icon={Trash2} onClick={() => excluirAlimento(food.id)} />}
              <Table.Cell textcell={food.amount.toString()} />
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default FoodSection;
