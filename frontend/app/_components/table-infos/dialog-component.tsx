import { ReactElement, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';

interface Field {
  type: string; // Tipo do campo (ex: 'text', 'password', 'select', 'url')
  name: string; // Nome do campo
  placeholder: string; // Placeholder do campo
  options?: string[]; // Se for um select, as opções
}

interface DialogComponentProps {
  addinfo: string;
  descriptioninfo: string;
  fields: Field[]; // Campos dinâmicos
  apiEndpoint: string; // Endpoint da API
  link?: ReactElement;
}

function DialogComponent({
  addinfo,
  descriptioninfo,
  fields,
  apiEndpoint,
  link
}: DialogComponentProps) {
  const [formData, setFormData] = useState<{ [key: string]: any }>({ roles: [] });

  // Atualiza o estado dos campos dinamicamente
  const handleInputChange = (name: string, value: string) => {
    console.log(`Campo: ${name}, Valor: ${value}`); // Para depuração
    if (name === "role") {
      setFormData((prevData) => ({
        ...prevData,
        roles: [{ name: value }], // Formato esperado pelo backend
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Função para enviar os dados do formulário
  const handleSubmit = async () => {
    // Validação básica para garantir que todos os campos estejam preenchidos
    for (const field of fields) {
      if (!formData[field.name] && field.type !== "select") {
        alert(`Preencha o campo: ${field.placeholder}`);
        return;
      }
    }

    console.log('Dados a serem enviados:', formData); // Para depuração

    // Envia os dados do formulário para o endpoint especificado
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Envia os dados do formulário como JSON
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar dados');
      }

      const data = await response.json();
      console.log('Dados adicionados com sucesso:', data);
      // Limpa os campos após o sucesso
      setFormData({ roles: [] });
    } catch (error: unknown) {
      console.error('Erro ao adicionar dados:', error);
    
      if (error instanceof Error) {
        alert(`Erro: ${error.message}`); // Mostra a mensagem de erro se for uma instância de Error
      } else {
        alert('Ocorreu um erro desconhecido.'); // Caso não seja uma instância de Error
      }
    }
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
          <DialogDescription>{link}</DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          {fields.map((field) =>
            field.type === 'select' ? (
              <Select
                key={field.name}
                onValueChange={(value) => {
                  console.log(`Valor do select mudado para: ${value}`); // Para depuração
                  handleInputChange(field.name, value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            )
          )}
          <DialogFooter>
            <Button variant="destructive" type="button" onClick={handleSubmit}>Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogComponent;
