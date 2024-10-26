'use server';

import { revalidatePath } from 'next/cache';

import { baseUrl, getHeaders } from './config';
import { redirect } from 'next/navigation';
import { deleteToken, setToken } from '@/lib/token';

export async function login(formData) {
  const userData = Object.fromEntries(formData);
  console.log(userData);

  const response = await fetch(`${baseUrl}/mini-project/api/auth/login`, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(userData),
  });

  const { token } = await response.json();
  await setToken(token);

  revalidatePath('/notes');
  redirect('/notes');
}

export async function register(formData) {
  const response = await fetch(`${baseUrl}/mini-project/api/auth/register`, {
    method: 'POST',
    body: formData,
  });

  const { token } = await response.json();
  await setToken(token);

  revalidatePath('/users');

  revalidatePath('/notes');
  redirect('/notes');
}

export async function logout() {
  await deleteToken();
  redirect('/');
}
