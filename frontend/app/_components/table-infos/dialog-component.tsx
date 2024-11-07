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
  menuCategory?: boolean;
}

function DialogComponent({
  addinfo,
  descriptioninfo,
  fields,
  apiEndpoint,
  link,
  menuCategory,
}: DialogComponentProps) {
  const [formData, setFormData] = useState<{ [key: string]: any }>({ categories: [] });

  // Atualiza o estado dos campos dinamicamente
  const handleInputChange = (name: string, value: string) => {
    if (name === "category") {
      setFormData((prevData) => ({
        ...prevData,
        categories: [...prevData.categories, value], // Adiciona nova categoria
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const removeCategory = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      categories: prevData.categories.filter((category: string) => category !== value),
    }));
  };

  const handleSubmit = async () => {
    for (const field of fields) {
      if (!formData[field.name] && field.type !== "select") {
        alert(`Preencha o campo: ${field.placeholder}`);
        return;
      }
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar dados');
      }

      const data = await response.json();
      console.log('Dados adicionados com sucesso:', data);
      setFormData({ categories: [] });
    } catch (error) {
      console.error('Erro ao adicionar dados:', error);
      alert(`Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center px-4 py-2 rounded-lg">
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
                onValueChange={(value) => handleInputChange(field.name, value)}
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
          {menuCategory && (
            <div>
            <h4>Categorias Selecionadas:</h4>
            {formData.categories.map((category: string) => (
              <div key={category} className="flex items-center justify-between space-y-2 space-x-2">
                <span>{category}</span>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => removeCategory(category)}
                >
                  Remover
                </Button>
              </div>
            ))}
          </div>
          )}
          
          <DialogFooter>
            <Button variant="destructive" type="button" onClick={handleSubmit}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogComponent;
