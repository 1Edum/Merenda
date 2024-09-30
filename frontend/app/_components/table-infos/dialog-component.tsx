import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';

interface DialogComponentProps {
  addinfo: string;
  descriptioninfo: string;
}

function DialogComponent({ addinfo, descriptioninfo }: DialogComponentProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Para armazenar o role selecionado
  const [classRoom, setClassRoom] = useState(''); // Para armazenar a classRoom selecionada

  // Função para enviar o usuário para a API
  const handleAddUser = () => {
    // Verifica se todos os campos estão preenchidos
    if (!name || !email || !password || !role || !classRoom) {
      alert('Preencha todos os campos!');
      return;
    }

    const newUser = {
      name: name,
      email: email,
      password: password,
      roles: [{ name: role }],  // Role selecionada
      classRoom: [{ name: classRoom }]  // Classe selecionada
    };

    console.log('Enviando usuário:', newUser); // Log dos dados que você está enviando

    fetch('http://localhost/user/inserir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        console.log('Response status:', response.status); // Log da resposta do servidor
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao adicionar usuário');
        }
      })
      .then((data) => {
        console.log('Usuário adicionado com sucesso:', data);
        // Limpa os campos após o sucesso
        setName('');
        setEmail('');
        setPassword('');
        setRole('');
        setClassRoom('');
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
          <section className='flex gap-x-4'>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </section>
          
          {/* Select para Role */}
          <section className='flex gap-x-4'>

            <Select onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Estudante">Estudante</SelectItem>
                <SelectItem value="Cozinheiro">Cozinheiro</SelectItem>
                <SelectItem value="Administrador">Administrador</SelectItem>
              </SelectContent>
            </Select>

            {/* Select para ClassRoom */}
            <Select onValueChange={setClassRoom}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma sala de aula" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 Ano A">1 Ano A</SelectItem>
                <SelectItem value="2 Ano B">2 Ano B</SelectItem>
                <SelectItem value="3 Ano C">3 Ano C</SelectItem>
              </SelectContent>
            </Select>

          </section>

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
