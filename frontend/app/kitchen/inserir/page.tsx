'use client'

import React, { useState } from 'react';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import useAddFood from '@/app/_hooks/useAddFood';
import useFirebaseUpload from '@/app/_hooks/useFirebaseUpload';

function Page() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const { addFood, loading: addingFood, error: addError, success } = useAddFood();
  const { uploadFile, uploading, error: uploadError } = useFirebaseUpload();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedFile) {
      // Faz o upload do arquivo para o Firebase Storage e obtém a URL da imagem
      const imageUrl = await uploadFile(selectedFile);

      // Verifica se o upload foi bem-sucedido antes de prosseguir
      if (imageUrl) {
        // Envia a URL da imagem para o backend junto com outros dados do formulário
        await addFood({ name, description, image: imageUrl, category });
      }
    }
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
        <Input placeholder={"Nome"} value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder={"Descrição"} value={description} height={"h-20"} onChange={(e) => setDescription(e.target.value)} />
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
        
        <Button onClick={handleSubmit} disabled={uploading || addingFood}>
          {uploading || addingFood ? "Carregando..." : "Cadastrar"}
        </Button>
        {uploadError && <p className="text-red-500">Erro ao fazer upload: {uploadError}</p>}
        {addError && <p className="text-red-500">Erro ao adicionar comida: {addError}</p>}
        {success && <p className="text-green-500">Comida adicionada com sucesso!</p>}
      </section>
    </main>
  );
}

export default Page;
