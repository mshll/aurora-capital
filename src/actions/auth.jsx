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

export async function register(formData) {
  console.log(formData);
  const response = await fetch(`${baseUrl}/mini-project/api/auth/register`, {
    method: 'POST',
    body: formData,
  });

  let redirectPath = '/register';
  try {
    const { token } = await response.json();
    console.log(token);
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
