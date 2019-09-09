import { server, apiBase, auth } from '@test/support';
import UserFactory, { userFactory } from '@factories/user';
import models from '@database/models';
import JWTService from '@services/jwt-service';

let user;
let authToken;

beforeAll(async () => {
  user = await UserFactory();
  authToken = await auth({
    username: user.username,
    password: 'secret',
  });
});

afterAll(() => {
  models.sequelize.close();
});

describe('GET /users', () => {
  it('should fetch a list of users', (done) => {
    server()
      .get(`${apiBase}/users`)
      .expect(200)
      .end((err, res) => {
        const { data } = res.body;
        expect(res.body).toHaveProperty('success', true);
        expect(data).toHaveProperty('users');
        expect(data.users).toBeInstanceOf(Array);
        done();
      });
  });
});

describe('GET /users/:id', () => {
  it('should fetch a single user resource', (done) => {
    const { id } = user;

    server()
      .get(`${apiBase}/users/${id}`)
      .expect(200)
      .end((err, res) => {
        const { data } = res.body;

        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        expect(data).toHaveProperty('user');
        expect(data.user).toHaveProperty('firstName', user.firstName);
        expect(data.user).toHaveProperty('lastName', user.lastName);
        expect(data.user).toHaveProperty('email', user.email);
        done();
      });
  });
});

describe('POST /users', () => {
  it('should create a new user resource', (done) => {
    const userData = userFactory();
    jest.spyOn(JWTService, 'sign').mockReturnValue('token');

    server()
      .post(`${apiBase}/users`)
      .send(userData)
      .expect(201)
      .end((err, res) => {
        const { data } = res.body;

        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        expect(res.header).toHaveProperty('x-auth-token', 'token');
        expect(data).toHaveProperty('user');
        expect(data.user).toHaveProperty('firstName', userData.firstName);
        expect(data.user).toHaveProperty('lastName', userData.lastName);
        expect(data.user).toHaveProperty('email', userData.email);
        done();
      });
  });
});

describe('PUT /users/:id', () => {
  it('should update a specific user resource', (done) => {
    const { id } = user;
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
    };

    server()
      .put(`${apiBase}/users/${id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(userData)
      .expect(200)
      .end((err, res) => {
        const { data } = res.body;

        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        expect(data).toHaveProperty('user');
        expect(data.user).toHaveProperty('firstName', userData.firstName);
        expect(data.user).toHaveProperty('lastName', userData.lastName);
        expect(data.user).toHaveProperty('email', userData.email);
        done();
      });
  });
});

describe('DELETE /users/:id', () => {
  it('should delete a single user resource', (done) => {
    const { id } = user;

    server()
      .delete(`${apiBase}/users/${id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204, done);
  });
});
