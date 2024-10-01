import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';

interface Field {
  type: string; // Tipo do campo (ex: 'text', 'password', 'select')
  name: string; // Nome do campo
  placeholder: string; // Placeholder do campo
  options?: string[]; // Se for um select, as opções
}

interface DialogComponentProps {
  addinfo: string;
  descriptioninfo: string;
  fields: Field[]; // Campos dinâmicos
  apiEndpoint: string; // Endpoint da API
}

function DialogComponent({ addinfo, descriptioninfo, fields, apiEndpoint }: DialogComponentProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  // Atualiza o estado dos campos dinamicamente
  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para enviar dados para a API
  const handleSubmit = () => {
    // Verifica se todos os campos estão preenchidos
    for (const field of fields) {
      if (!formData[field.name]) {
        alert(`Preencha o campo: ${field.placeholder}`);
        return;
      }
    }

    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao adicionar dados');
        }
      })
      .then((data) => {
        console.log('Dados adicionados com sucesso:', data);
        // Limpa os campos após o sucesso
        setFormData({});
      })
      .catch((error) => {
        console.error('Erro ao adicionar dados:', error);
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
          {fields.map((field) =>
            field.type === 'select' ? (
              <Select key={field.name} onValueChange={(value) => handleInputChange(field.name, value)}>
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
            <Button variant="outline">Cancelar</Button>
            <Button variant="destructive" onClick={handleSubmit}>Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogComponent;
