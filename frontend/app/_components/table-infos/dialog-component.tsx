import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';

interface DialogComponentProps {
  addinfo: string;
  descriptioninfo: string;
  // Aqui o onAddUser não é mais necessário, pois a lógica será interna
}

function DialogComponent({ addinfo, descriptioninfo }: DialogComponentProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  // Função para enviar o usuário para a API
  const handleAddUser = () => {
    const newUser = {
      name: name,
      email: email,
      roles: [{ name: role }]  // Enviar como um array de objetos com a role
    };

    fetch('http://localhost/user/inserir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao adicionar usuário');
        }
      })
      .then((data) => {
        // Aqui você pode tratar o sucesso, talvez limpando os campos
        console.log('Usuário adicionado com sucesso:', data);
        setName('');
        setEmail('');
        setRole('');
      })
      .catch((error) => {
        console.error('Erro ao adicionar usuário:', error);
      });
  };

  return (
    <Dialog>
      <DialogTrigger className='bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center px-4 py-2 rounded-lg'>
        {addinfo}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{addinfo}</DialogTitle>
          <DialogDescription>{descriptioninfo}</DialogDescription>
        </DialogHeader>
        <form className="space-y-3">
          <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Select onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma profissão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Estudante">Estudante</SelectItem>
              <SelectItem value="Cozinheiro">Cozinheiro</SelectItem>
              <SelectItem value="Administrador">Administrador</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant={"outline"}>Cancelar</Button>
            <Button variant={"destructive"} onClick={handleAddUser}>Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
