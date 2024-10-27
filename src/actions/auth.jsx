'use server';

import { revalidatePath } from 'next/cache';

import { baseUrl, getHeaders } from './config';
import { redirect } from 'next/navigation';
import { deleteToken, setToken } from './token';

export async function login(formData) {
  const response = await fetch(`${baseUrl}/mini-project/api/auth/login`, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(formData),
  });

  const { token } = await response.json();
  await setToken(token);

  revalidatePath('/');
  redirect('/');
}

export async function register(data) {
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);
  formData.append('image', data.image);

  let redirectPath = '/register';
  try {
    const response = await fetch(`${baseUrl}/mini-project/api/auth/register`, {
      method: 'POST',
      body: formData,
    });

    const { token } = await response.json();
    await setToken(token);
    revalidatePath('/users');
    redirectPath = '/';
  } catch (error) {
    console.error(error);
  } finally {
    redirect(redirectPath);
  }
}

export async function logout() {
  await deleteToken();
  redirect('/');
}
