'use client'

import { useEffect, useState } from 'react';
import Filter from '../_components/table-infos/filter';
import DialogComponent from '../_components/table-infos/dialog-component';
import UserTable from '../_components/table-infos/user-table';


export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost/user/listar')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar os usuários:', error);
      });
  }, []);

  const handleFilterChange = (filterValue: string) => {
    setFilter(filterValue);
  };

  const handleAddUser = (newUser: { name: string; email: string; role: string }) => {
    console.log('Adicionando usuário:', newUser);
    // Aqui você pode fazer uma chamada para a API para adicionar o novo usuário
  };

  const filteredUsers = users.filter(user => user.email.includes(filter));

  return (
    <div className="lg:px-24 px-5 py-3">
      <Filter textfilter="Filtrar email" onFilterChange={handleFilterChange} />
      <DialogComponent addinfo="Adicionar Usuário" descriptioninfo="Preencha para adicionar novo usuário" />
      <UserTable users={filteredUsers} />
    </div>
  );
}
