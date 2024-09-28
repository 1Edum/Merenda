import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";

// Atualizando a interface User para que roles seja um array de objetos
interface Role {
  name: string; // Define que cada role tem uma propriedade 'name'
}

interface User {
  id: number;
  name: string;
  email: string;
  roles: Role[]; // Mudando para Role[] ao invés de string[]
}

interface UserTableProps {
  users: User[];
}

function UserTable({ users }: UserTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <th>Nome</th>
          <th>Email</th>
          <th>Profissão</th>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.roles.length > 0 
                ? user.roles.map(role => role.name).join(', ') 
                : 'Sem função'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
