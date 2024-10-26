import { getToken } from './token';

const baseUrl = 'https://react-bank-project.eapi.joincoded.com';

async function getHeaders() {
  const token = await getToken();
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${token}`);

  return headers;
}

export { getHeaders, baseUrl };
