"use client"

import React, { useEffect, useState } from 'react';
import DialogComponent from './table-infos/dialog-component';
import Filter from './table-infos/filter';
import { Table } from './table-infos/table';
import { Trash2 } from 'lucide-react';
import { Waste } from '../interface/Waste';
import { deleteWaste, fetchWastes } from '@/lib/services/waste/wasteService';


function WasteSection() {
  const [wastes, setWastes] = useState<Waste[]>([]);
  const [filteredWastes, setFilteredWastes] = useState<Waste[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const loadWastes = async () => {
      try {
        const fetchedWastes = await fetchWastes();
        setWastes(fetchedWastes);
        setFilteredWastes(fetchedWastes);
      } catch (error) {
        console.error("Erro ao carregar os desperdícios:", error);
      }
    };
    loadWastes();
  }, []);

  const excluirWaste = async (id: number) => {
    try {
      await deleteWaste(id);
      setWastes((prevWastes) => prevWastes.filter((waste) => waste.id !== id));
      setFilteredWastes((prevWastes) => prevWastes.filter((waste) => waste.id !== id));
    } catch (error) {
      console.error("Erro ao excluir desperdício:", error);
    }
  };

  // Função para aplicar o filtro nos desperdícios
  const handleFilterChangeWaste = (value: string) => {
    setFilter(value);
    setFilteredWastes(
      wastes.filter((waste) =>
        waste.date.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="border rounded-lg my-7">
      <div className="flex flex-col md:flex-row justify-between pb-4 space-y-2 md:space-y-0">
        <Filter textfilter="Filter waste" onFilterChange={handleFilterChangeWaste} />
        <DialogComponent
          addinfo="Add Waste"
          descriptioninfo="Fill in the food information"
          apiEndpoint="http://localhost/waste/inserir"
          menuCategory={false}
          fields={[
            { type: "text", name: "date", placeholder: "Data" },
            { type: "text", name: "amount", placeholder: "Waste Amount" },
          ]}
        />
      </div>
      <Table.Root>
        <Table.Header>
          {["Date", "Amount(Kg)", "Actions"].map((item) => (
            <Table.Cell key={item} textcell={item} />
          ))}
        </Table.Header>
        <Table.Body>
          {filteredWastes.map((waste) => (
            <Table.Row key={waste.id}>
              <Table.Cell textcell={waste.date} />
              <Table.Cell textcell={waste.amount.toString()} />
              <Table.Action icon={Trash2} onClick={() => excluirWaste(waste.id)} />
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default WasteSection;
