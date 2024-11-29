import { ReactElement, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface Field {
  type: string; // Tipo do campo (ex: 'text', 'password', 'select', 'url')
  name: string; // Nome do campo
  placeholder: string; // Placeholder do campo
  options?: string[]; // Se for um select, as opções
  value?: string; // Valor padrão para o campo
}

interface DialogComponentProps {
  addinfo: string;
  icon?: ReactElement; // Ícone para o botão
  descriptioninfo: string;
  fields: Field[]; // Campos dinâmicos
  apiEndpoint: string; // Endpoint da API
  link?: ReactElement; // Link adicional
  menuCategory?: boolean; // Habilitar funcionalidade de categorias
  onSubmit?: (updatedData: any) => void; // Callback após submissão
  method?: string; // Método HTTP (default: POST)
  id?: number; // ID opcional para edição
}

function DialogComponent({
  addinfo,
  descriptioninfo,
  fields,
  apiEndpoint,
  link,
  menuCategory,
  icon,
  method = "POST",
  id,
  onSubmit,
}: DialogComponentProps) {
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    roles: [],
    categories: [],
  });

  // Atualiza os campos do formulário dinamicamente
  const handleInputChange = (name: string, value: string) => {
    if (name === "role") {
      setFormData((prevData) => ({
        ...prevData,
        roles: [{ name: value }],
      }));
    } else if (name === "category") {
      setFormData((prevData) => ({
        ...prevData,
        categories: [...prevData.categories, value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Remove uma categoria selecionada
  const removeCategory = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      categories: prevData.categories.filter(
        (category: string) => category !== value
      ),
    }));
  };

  // Submete os dados do formulário
  const handleSubmit = async () => {
    for (const field of fields) {
      if (!formData[field.name] && field.type !== "select") {
        alert(`Preencha o campo: ${field.placeholder}`);
        return;
      }
    }

    try {
      const response = await fetch(apiEndpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...(id && { id }), ...formData }),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${await response.text()}`);
      }

      if (onSubmit) {
        await onSubmit(await response.json());
      } else {
        const data = await response.json();
        console.log("Dados enviados com sucesso:", data);
      }

      setFormData({ roles: [], categories: [] });
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert(`Erro: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center px-4 py-2 rounded-lg">
        {icon} {icon ? null : addinfo}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{addinfo}</DialogTitle>
          <DialogDescription>{descriptioninfo}</DialogDescription>
          <DialogDescription>{link}</DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          {fields.map((field) =>
            field.type === "select" ? (
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
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            )
          )}
          {menuCategory && formData.categories.length > 0 && (
            <div>
              <h4>Categorias Selecionadas:</h4>
              {formData.categories.map((category: string) => (
                <div
                  key={category}
                  className="flex items-center justify-between space-y-2 space-x-2"
                >
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
