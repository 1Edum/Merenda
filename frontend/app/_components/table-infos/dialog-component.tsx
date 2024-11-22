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
  type: string;
  name: string;
  placeholder: string;
  options?: string[];
  value?: string;
}

interface DialogComponentProps {
  addinfo: string;
  icon?: ReactElement;
  descriptioninfo: string;
  fields: Field[]; // Campos dinâmicos
  apiEndpoint: string; // Endpoint da API
  link?: ReactElement;
  menuCategory?: boolean;
  onSubmit?: (updatedData: any) => void;
  method?: string; // Adicionado
  id?: number; // Adicionado
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
    categories: [],
  });

  const handleInputChange = (name: string, value: string) => {
    if (name === "category") {
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

  const removeCategory = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      categories: prevData.categories.filter(
        (category: string) => category !== value
      ),
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
        method, // Use o método fornecido
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...(id && { id }), ...formData }),
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }
  
      if (onSubmit) {
        await onSubmit(await response.json());
      } else {
        const data = await response.json();
        console.log("Data submitted successfully:", data);
      }
  
      setFormData({ categories: [] });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
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
                onValueChange={(value) => handleInputChange(field.name, value)}>
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
                  className="flex items-center justify-between space-y-2 space-x-2">
                  <span>{category}</span>
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => removeCategory(category)}>
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="destructive" type="button" onClick={handleSubmit}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogComponent;
