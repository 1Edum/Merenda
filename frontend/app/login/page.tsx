"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import React, { useState } from 'react';
import { loginUser } from '@/lib/services/authService';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { decoded } = await loginUser(email, password);

      // Redireciona com base no campo roles
      if (decoded.roles && decoded.roles.includes('Administrator')) {
        router.push('/admin');
      } else if (decoded.roles && decoded.roles.includes('Student')) {
        router.push('/student');
      } else if (decoded.roles && decoded.roles.includes('Kitchen')) {
        router.push('/kitchen');
      } else {
        console.error('Role não encontrada no token.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <main className='flex justify-center items-center w-full h-[80vh]'>
      <div className='border rounded-lg px-4 py-7 flex flex-col gap-8 w-72 md:w-96'>
        <h1 className='text-5xl text-center'>Login</h1>
        <div>
          <label>Nome</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu nome"
            className='w-full'
          />
        </div>
        <div>
          <label>Senha</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className='w-full'
          />
        </div>
        <Button variant="destructive" onClick={handleLogin}>
          Entrar
        </Button>
      </div>
    </main>
  );
}

export default LoginPage;
