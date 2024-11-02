import { jwtDecode } from 'jwt-decode';

export async function loginUser(email: string, password: string) {
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
    const decoded: any = jwtDecode(token);
    return { token, decoded };
  } else {
    throw new Error('Erro ao fazer login.');
  }
}
