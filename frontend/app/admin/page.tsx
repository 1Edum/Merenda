import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/app/_components/ui/dialog";
import React from "react";
import { PlusCircle, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../_components/ui/select";

export default function page() {
  return (
    <div className="P-6 max-w-4xl mx-auto space-y-2">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <Input placeholder="Filtar e-mails..." className="w-auto" />
          <Button variant={"destructive"}>
            <Search className="mr-3 w-5 h-5" /> Filtrar Resultados
          </Button>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button variant={"destructive"}>
              <PlusCircle className="mr-3 w-5 h-5" /> Adicionar Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Usuário</DialogTitle>
              <DialogDescription>Crie um novo usuário</DialogDescription>
            </DialogHeader>
            <form action="" className="space-y-3">
              <div>
                <label htmlFor="">Nome do usuário</label>
                <Input />
              </div>
              <div>
                <label htmlFor="">E-mail</label>
                <Input />
              </div>
              <div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Profissão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aluno">Aluno</SelectItem>
                    <SelectItem value="Cozinheiro">Cozinheiro</SelectItem>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button variant={"outline"}>Cancelar</Button>
                <Button variant={"destructive"}>Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-lg p-3">
        <Table>
          <TableHeader>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Profissão</TableHead>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 20 }).map((_, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>Eduardo</TableCell>
                  <TableCell>{i}</TableCell>
                  <TableCell>Aluno</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
