import request from 'supertest';
import app from '@src/app';

export const server = () => request(app);
export const apiBase = '/api/v1';

export const auth = async (user) => {
  const response = await server()
    .post(`${apiBase}/auth/login`)
    .send(user);

  return response.body.data.token;
};
