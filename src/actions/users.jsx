'use server';

import { revalidatePath } from 'next/cache';
import { baseUrl, getHeaders } from './config';

export const getAllUsers = async () => {
  const response = await fetch(`${baseUrl}/mini-project/api/auth/users`, {
    // method: 'get',
    headers: await getHeaders(),
    // body: JSON.stringify(userData),
  });
  const users = await response.json();
  console.log(users);
  return users.reverse();
};

export const myProfile = async () => {
  const response = await fetch(`${baseUrl}/mini-project/api/auth/me`, {
    // method: 'get',
    headers: await getHeaders(),
    // body: JSON.stringify(userData),
  });
  const user = response.json();
  return user;
};

export const updateProfile = async ({ image }) => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await fetch(`${baseUrl}/mini-project/api/auth/profile`, {
      method: 'PUT',
      headers: await getHeaders({ contentType: false }),
      body: formData,
    });

    const result = await response.json();
    revalidatePath('/profile');
    return !result.success; // because if successfull result won't have 'success' key
  } catch (error) {
    console.error('Profile update error:', error);
    return false;
  }
};

export const findUserById = async (id) => {
  const response = await fetch(`${baseUrl}/mini-project/api/auth/user/${id}`);
  let user;
  try {
    user = await response.json();
  } catch (error) {
    console.error('user not found ');

    // redirect('/somewhere');
  }
  return user;
};

///api/auth/user/66d9eb455f25f11b001cb6db
//
