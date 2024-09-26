import { Input } from './ui/input';
import { Button } from './ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

function TableInfos() {
  return (
    <div>
        <div className="flex justify-between">
        <div className="flex space-x-2">
          <Input placeholder="Filtar e-mails..." className="w-auto" />
          <Button variant={"destructive"}>
            <Search className="mr-3 w-5 h-5" /> Filtrar Resultados
          </Button>
        </div>
        <Dialog>
          <DialogTrigger className='bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center px-4 py-2 rounded-lg'>
              <PlusCircle className="mr-3 w-5 h-5" /> Adicionar Usuário

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
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Profissão</TableHead>
          </TableRow>
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
  )
}

export default TableInfos