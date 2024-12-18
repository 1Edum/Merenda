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
        <div className="flex space-x-2 justify-between">
          <Input
            placeholder={textfilter}
            className="size-components"
            onChange={(e) => setFilterValue(e.target.value)} // Atualiza o estado do filtro
          />
          <Button variant={"destructive"} className='h-9 md:h-10' onClick={handleFilterClick}>
            <Search className="mr-3 w-5 h-5" /> Filter Results
          </Button>
        </div>
      );
}

export default Filter