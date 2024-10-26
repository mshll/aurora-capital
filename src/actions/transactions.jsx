import { baseUrl } from './config';

export const myTransactions = async () => {
  const response = await fetch(`${baseUrl}/mini-project/api/transactions/my`);
  const users = response.json();
  return users;
};

export const deposit = async (formData) => {
  const userData = Object.fromEntries(formData);
  console.log(userData);

  //add try catch?

  const response = await fetch(`${baseUrl}/mini-project/api/transactions/deposit`, {
    method: 'PUT',
    headers: await getHeaders(),
    body: JSON.stringify(userData),
  });
  //   const result = await response.json();
  //   console.log(result);

  //https://apidog.com/blog/next-js-put-request/
  //using this for put method
  //incomplete it has to take the token of the current user so no need of ID parameter
};
export const withdraw = async (formData) => {
  const userData = Object.fromEntries(formData);
  console.log(userData);
  //add try catch?
  const response = await fetch(`${baseUrl}/mini-project/api/transactions/withdraw`, {
    method: 'PUT',
    headers: await getHeaders(),
    body: JSON.stringify(userData),
  });
  //   const result = await response.json();
  //   console.log(result);

  //https://apidog.com/blog/next-js-put-request/
  //using this for put method
  //incomplete it has to take the token of the current user so no need of ID parameter
};
export const transfer = async (formData, username) => {
  const userData = Object.fromEntries(formData);
  console.log(userData);
  //add try catch?
  const response = await fetch(`${baseUrl}/mini-project/api/transactions/transfer/${username}`, {
    method: 'PUT',
    headers: await getHeaders(),
    body: JSON.stringify(userData),
  });
  //   const result = await response.json();
  //   console.log(result);

  //https://apidog.com/blog/next-js-put-request/
  //using this for put method
  //incomplete it has to take the token of the current user so no need of ID parameter
};
