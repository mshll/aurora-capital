'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { baseUrl, getHeaders } from './config';
import { deleteToken, setToken } from './token';

export async function login(formData) {
  try {
    const response = await fetch(`${baseUrl}/mini-project/api/auth/login`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(formData),
    });
    const { token } = await response.json();
    await setToken(token);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function register(data) {
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);
  formData.append('image', data.image);

  try {
    const response = await fetch(`${baseUrl}/mini-project/api/auth/register`, {
      method: 'POST',
      body: formData,
    });

    const { token } = await response.json();
    await setToken(token);
    revalidatePath('/users');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  await deleteToken();
  redirect('/');
}
