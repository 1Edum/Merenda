"use client";

import { useEffect, useState } from "react";
import { User } from "../interface/User";
import { fetchUsers, handleExcluirUser } from "@/lib/services/user/userService";
import { Table } from "../_components/table-infos/table";
import { Trash2 } from "lucide-react";
import Filter from "../_components/table-infos/filter";
import DialogComponent from "./table-infos/dialog-component";
import { TableMobile } from "@/lib/help-mobile/table-mobile";

const UserSection = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userFilter, setUserFilter] = useState("");
  const isMobile = TableMobile();

  // Fetch de usuários
  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  const handleFilterChangeUser = (filterValue: string) => {
    setUserFilter(filterValue);
  };

  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(userFilter.toLowerCase())
  );

  return (
    <div className="border rounded-lg my-7" id="adicionarcomida">
      <div className="flex flex-col md:flex-row justify-between pb-4 space-y-2 md:space-y-0">
        <Filter
          textfilter="Filter users"
          onFilterChange={handleFilterChangeUser}
        />
        <DialogComponent
          addinfo="Add User"
          descriptioninfo="Fill in the user information"
          apiEndpoint="http://localhost/user/inserir"
          fields={[
            { type: "text", name: "username", placeholder: "Name" },
            { type: "text", name: "email", placeholder: "Email" },
            { type: "password", name: "password", placeholder: "Password" },
            {
              type: "select",
              name: "role",
              placeholder: "Select a function",
              options: ["Student", "Kitchen", "Administrator"],
            },
          ]}
        />
      </div>
      <Table.Root>
        <Table.Header>
          {(isMobile
            ? ["Name", "Profession", "Actions"]
            : ["Name", "Email", "Profession", "Actions"]
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
                textcell={user.roles?.map((role) => role.name).join(", ")}
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
  );
};

export default UserSection;
