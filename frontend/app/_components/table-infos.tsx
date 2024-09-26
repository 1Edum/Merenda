import { Input } from './ui/input';
import { Button } from './ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';


interface Field {
  type: 'input' | 'select';
  label: string;
  placeholder?: string; // Apenas para selects
  options?: { value: string; text: string }[]; // Para select
}

interface TableInfosProps {
  textfilter: string;
  addinfo: string;
  descriptioninfo: string;
  fields: Field[]; // Adicionando o campo fields
}

function TableInfos({ textfilter, addinfo, descriptioninfo, fields }: TableInfosProps) {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <Input placeholder={textfilter} className="w-auto" />
          <Button variant={"destructive"}>
            <Search className="mr-3 w-5 h-5" /> Filtrar Resultados
          </Button>
        </div>
        <Dialog>
          <DialogTrigger className='bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center px-4 py-2 rounded-lg'>
            <PlusCircle className="mr-3 w-5 h-5" /> {addinfo} {/*Adicionar Usuário*/}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{addinfo}</DialogTitle>
              <DialogDescription>{descriptioninfo}</DialogDescription>
            </DialogHeader>
            <form action="" className="space-y-3">
              {fields.map((field, index) => (
                <div key={index}>
                  <label htmlFor={`input-${index}`}>{field.label}</label>
                  {field.type === 'input' ? (
                    <Input id={`input-${index}`} />
                  ) : (
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options ? (
                          field.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.text}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="">Nenhuma opção disponível</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
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
              <TableCell>Série</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className='max-h-64 '>
            {Array.from({ length: 20 }).map((_, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>Eduardo</TableCell>
                  <TableCell>eduardo{1}@gmail.com</TableCell>
                  <TableCell>Estudante</TableCell>
                  <TableCell>{i}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TableInfos;
