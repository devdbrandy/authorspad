import UserFactory from '@factories/user';
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
