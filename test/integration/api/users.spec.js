import { server, apiBase, auth } from '@test/support';
import models from '@database/models';
import { userFactory, build as newUserInstance } from '@factories/user';
import RoleFactory from '@factories/role';
import JWTService from '@services/jwt-service';

let mockUser;
let authToken;

beforeAll(async () => {
  const user = await newUserInstance({ isVerified: true }).save();

  // create and assign role/permission to user
  const writerRole = await RoleFactory({
    name: 'writer',
    ownership: true,
    permissions: [
      { scope: 'user:edit' },
      { scope: 'user:delete' },
    ],
  });
  await user.addRole(writerRole);

  mockUser = user.get();
  authToken = await auth({
    username: mockUser.username,
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
    const { id } = mockUser;

    server()
      .get(`${apiBase}/users/${id}`)
      .expect(200)
      .end((err, res) => {
        const { data } = res.body;

        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        expect(data).toHaveProperty('user');
        expect(data.user).toHaveProperty('firstName', mockUser.firstName);
        expect(data.user).toHaveProperty('lastName', mockUser.lastName);
        expect(data.user).toHaveProperty('email', mockUser.email);
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
    const { id } = mockUser;
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
    const { id } = mockUser;

    server()
      .delete(`${apiBase}/users/${id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204, done);
  });
});
