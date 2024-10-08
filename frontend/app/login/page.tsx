"use client";

import { useRouter } from 'next/navigation'; // Certifique-se de importar do 'next/navigation' no Next.js 13+
import { jwtDecode } from 'jwt-decode';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Agora você pode usar o router corretamente

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.accessToken;
  
        // Decodifica o token JWT
        const decoded: any = jwtDecode(token);
  
        // Exibe o token decodificado no console para inspecionar o conteúdo
        console.log("Token decodificado:", decoded);
  
        // Redireciona com base no campo roles
        if (decoded.roles && decoded.roles.includes('ADMIN')) {
          router.push('/admin');
        } else if (decoded.roles && decoded.roles.includes('STUDENT')) {
          router.push('/student');
        } else if (decoded.roles && decoded.roles.includes('KITCHEN')) {
          router.push('/kitchen');
        } else {
          console.error('Role não encontrada no token.');
        }
      } else {
        console.error('Erro ao fazer login.');
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
          />
        </div>
        <div>
          <label>Senha</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
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
