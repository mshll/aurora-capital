'use server';
import { baseUrl, getHeaders } from './config';

export const getAllUsers = async () => {
  const response = await fetch(`${baseUrl}/mini-project/api/auth/users`, {
    // method: 'get',
    headers: await getHeaders(),
    // body: JSON.stringify(userData),
  });
  const users = response.json();
  return users;
};
export const myProfile = async () => {
  const response = await fetch(`${baseUrl}/mini-project/api/auth/me`, {
    // method: 'get',
    headers: await getHeaders(),
    // body: JSON.stringify(userData),
  });
  const users = response.json();
  return users;
};
export const updateProfile = async (formData) => {
  try {
    const response = await fetch(`${baseUrl}/mini-project/api/auth/profile`, {
      method: 'PUT',
      headers: await getHeaders(),
      body: formData,
    });
    console.log(formData);
    return await response.json();
  } catch (error) {
    console.error('Profile update error:', error);
    return { success: false };
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
