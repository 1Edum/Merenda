"use client"

import React from 'react'

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface FilterProps {
    textfilter: string;
    onFilterChange: (filter: string) => void; // Função para passar o valor do filtro
  }
  
function Filter({textfilter, onFilterChange}: FilterProps) {
    const [filterValue, setFilterValue] = useState('');

    const handleFilterClick = () => {
        onFilterChange(filterValue); // Chama a função para atualizar o filtro ao clicar no botão
      };
      return (
        <div className="flex space-x-2">
          <Input
            placeholder={textfilter}
            className="w-auto"
            onChange={(e) => setFilterValue(e.target.value)} // Atualiza o estado do filtro
          />
          <Button variant={"destructive"} onClick={handleFilterClick}>
            <Search className="mr-3 w-5 h-5" /> Filtrar Resultados
          </Button>
        </div>
      );
}

export default Filter