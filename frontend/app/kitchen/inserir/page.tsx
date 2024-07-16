'use client'

// components/Page.tsx
import React, { useState } from 'react';
import Button from '@/app/_components/button';
import Input from '@/app/_components/input';
import useAddFood from '@/app/_hooks/useAddFood';

function Page() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const { addFood, loading, error, success } = useAddFood();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let imageBase64 = null;
    if (selectedFile) {
      imageBase64 = await convertFileToBase64(selectedFile);
    }
    await addFood({ name, description, image: imageBase64, category });
  };

  const handleCategoryClick = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const getCategoryClass = (currentCategory: string) => {
    return category === currentCategory ? 'bg-blue-500 text-white' : 'bg-white';
  };

  return (
    <main className='flex flex-col justify-center items-center gap-y-2 h-[85vh]'>
      <section className='bg-zinc-300 p-4 flex flex-col gap-y-4'>
        <h3>Adicionar Comida </h3>
        <Input text={"Nome"} value={name} onChange={(e) => setName(e.target.value)} />
        <Input text={"Descrição"} value={description} height={"h-20"} onChange={(e) => setDescription(e.target.value)} />
        <div className='border border-primary flex flex-col justify-center items-center rounded h-28 p-4'>
          <label htmlFor="file-upload" className='cursor-pointer text-center'>
            {selectedFile ? selectedFile.name : "Adicionar Imagem"}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className='hidden'
          />
        </div>
        <h3>Horário</h3>
        <div className='flex items-center justify-between'>
          <div
            className={`p-1 text-sm rounded-md cursor-pointer ${getCategoryClass('Café da Manha')}`}
            onClick={() => handleCategoryClick('Café da Manha')}
          >
            Café da Manha
          </div>
          <div
            className={`p-1 text-sm rounded-md cursor-pointer ${getCategoryClass('Almoço')}`}
            onClick={() => handleCategoryClick('Almoço')}
          >
            Almoço
          </div>
          <div
            className={`p-1 text-sm rounded-md cursor-pointer ${getCategoryClass('Café da Tarde')}`}
            onClick={() => handleCategoryClick('Café da Tarde')}
          >
            Café da Tarde
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={loading} >Cadastrar</Button>
        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">Erro: {error}</p>}
        {success && <p className="text-green-500">Comida adicionada com sucesso!</p>}
      </section>
    </main>
  );
}

export default Page;
