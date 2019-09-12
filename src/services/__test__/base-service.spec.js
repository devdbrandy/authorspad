import UserFactory, { userFactory } from '@factories/user';
import models from '@database/models';
import BaseService from '../base-service';

const { Model } = models.Sequelize;
const baseService = new BaseService(models.User);
let mockUser;

beforeAll(async () => {
  mockUser = await UserFactory();
});

afterAll(() => {
  models.sequelize.close();
});

describe('BaseService > getAll()', () => {
  it('should return the list of model objects', async () => {
    const result = await baseService.getAll({ plain: true });
    expect(result).toBeInstanceOf(Array);
  });
  it('should return the list of model instances', async () => {
    const [result] = await baseService.getAll();
    expect(result).toBeInstanceOf(Model);
  });
});

describe('BaseService > getById()', () => {
  it('should return a single model object by id', async () => {
    const { id } = mockUser;
    const result = await baseService.getById(id, { plain: true });
    expect(result).toEqual(mockUser);
  });
  it('should return a single model instance by id', async () => {
    const { id } = mockUser;
    const result = await baseService.getById(id);
    expect(result).toBeInstanceOf(Model);
  });
});

describe('BaseService > find()', () => {
  it('should return a single model object by given attribute', async () => {
    const { username } = mockUser;
    const result = await baseService.find({ username }, { plain: true });
    expect(result).toEqual(mockUser);
  });
  it('should return a single model instance by id', async () => {
    const { email } = mockUser;
    const result = await baseService.find({ email });
    expect(result).toBeInstanceOf(Model);
  });
});

describe('BaseService > create()', () => {
  it('should return newly created model', async () => {
    const userData = userFactory();
    const result = await baseService.create(userData);
    expect(result).toBeInstanceOf(Model);
  });
  it('should return newly created instance object', async () => {
    const userData = userFactory();
    const result = await baseService.create(userData, { plain: true });
    expect(result.firstName).toEqual(userData.firstName);
    expect(result.lastName).toEqual(userData.lastName);
    expect(result.email).toEqual(userData.email);
  });
});

describe('BaseService > update()', () => {
  it('should return updated model', async () => {
    const { id } = mockUser;
    const result = await baseService.update(id, { firstName: 'John' });
    expect(result.firstName).toEqual('John');
  });
});

describe('BaseService > delete()', () => {
  it('should return true if model is deleted', async () => {
    const { id } = mockUser;
    const result = await baseService.delete(id);
    expect(result).toBeTruthy();
  });
});
