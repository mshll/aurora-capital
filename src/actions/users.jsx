import { baseUrl, getHeaders } from './config';

export const getAllUsers = async () => {
  const response = await fetch(`${baseUrl}/mini-project/api/auth/users`);
  const users = response.json();
  return users;
};
export const myProfile = async () => {
  const response = await fetch(`${baseUrl}/mini-project/api/auth/me`);
  const users = response.json();
  return users;
};
export const updateProfile = async (formData) => {
  const userData = Object.fromEntries(formData);
  console.log(userData);

  //add try catch?

  const response = await fetch(`${baseUrl}/mini-project/api/auth/mini-project/api/auth/profile`, {
    method: 'PUT',
    headers: await getHeaders(),
    body: JSON.stringify(userData),
  });
  const result = await response.json();
  console.log(result);

  //https://apidog.com/blog/next-js-put-request/
  //using this for put method
  //incomplete it has to take the token of the current user so no need of ID parameter
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
