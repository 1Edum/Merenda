import React from "react";
import TableInfos from "../_components/table-infos";
import ScrollToTopButton from "../_components/ScrollButton";

// Definindo o tipo Field diretamente aqui para referência
interface Field {
  type: 'input' | 'select'; // Usando o tipo literal
  label: string;
  placeholder?: string; // Apenas para selects
  options?: { value: string; text: string }[]; // Para select
}


export default function Page() {
  const fields: Field[] = [ // Aqui definimos o tipo do array
    { type: 'input', label: 'Nome' },
    { type: 'input', label: 'Email' },
    {
      type: 'select',
      label: 'Profissão',
      placeholder: 'Selecione uma profissão',
      options: [
        { value: 'Aluno', text: 'Estudante' },
        { value: 'Cozinheiro', text: 'Cozinheiro' },
        { value: 'Administrador', text: 'Administrador' },
      ],
    },
  ];

  return (

    <div className="lg:px-24 px-5 py-3 ">

      <TableInfos textfilter="Filtrar e-mail" addinfo="Adicionar Usuário" descriptioninfo="Preencha para adicionar novo usuário" fields={fields} />
      
      <ScrollToTopButton />
    </div>

  );
}
