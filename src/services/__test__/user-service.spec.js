import UserFactory, { userFactory } from '@factories/user';
import models from '@database/models';
import UserService from '../user-service';
import BaseService from '../base-service';

const { Model } = models.Sequelize;
let mockUser;

beforeAll(async () => {
  mockUser = await UserFactory();
});

afterAll(() => {
  models.sequelize.close();
});

describe('UserService Integration', () => {
  it('should extend BaseService', () => {
    expect(UserService).toBeInstanceOf(BaseService);
  });
});

describe('UserService > getAll()', () => {
  it('should return the list of user objects', async () => {
    const result = await UserService.getAll({ plain: true });
    expect(result).toBeInstanceOf(Array);
  });
  it('should return the list of user instances', async () => {
    const [result] = await UserService.getAll();
    expect(result).toBeInstanceOf(Model);
  });
});

describe('UserService > getById()', () => {
  it('should return a single user object by id', async () => {
    const { id } = mockUser;
    const result = await UserService.getById(id, { plain: true });
    expect(result).toEqual(mockUser);
  });
  it('should return a single user instance by id', async () => {
    const { id } = mockUser;
    const result = await UserService.getById(id);
    expect(result).toBeInstanceOf(Model);
  });
});

describe('UserService > create()', () => {
  it('should return newly created user', async () => {
    const userData = userFactory();
    const result = await UserService.create(userData);
    expect(result.firstName).toEqual(userData.firstName);
    expect(result.lastName).toEqual(userData.lastName);
    expect(result.email).toEqual(userData.email);
  });
});

describe('UserService > update()', () => {
  it('should return updated user', async () => {
    const { id } = mockUser;
    const result = await UserService.update(id, { firstName: 'John' });
    expect(result.firstName).toEqual('John');
  });
});

describe('UserService > delete()', () => {
  it('delete() should return true if user is deleted', async () => {
    const { id } = mockUser;
    const result = await UserService.delete(id);
    expect(result).toBeTruthy();
  });
});

describe('UserService > getByEmailOrUsername', () => {
  beforeAll(async () => {
    mockUser = await UserFactory();
  });

  it('should return a single user object by username', async () => {
    const { username } = mockUser;
    const result = await UserService.getByEmailOrUsername(username, { plain: true });
    expect(result).toEqual(mockUser);
  });
  it('should return a single user object by email', async () => {
    const { email } = mockUser;
    const result = await UserService.getByEmailOrUsername(email, { plain: true });
    expect(result).toEqual(mockUser);
  });
  it('should return a single model instance by email or username', async () => {
    const { email } = mockUser;
    const result = await UserService.getByEmailOrUsername(email);
    expect(result).toBeInstanceOf(Model);
  });
});
