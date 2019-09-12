import { Unauthorized } from 'http-errors';
import JWTService from '@services/jwt-service';
import models from '@database/models';
import { build as newUserInstance } from '@factories/user';
import { messages } from '@helpers/constants';
import controller from '../auth-controller';

const userMock = newUserInstance({ username: 'johnd' });

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  header: jest.fn(),
};
const next = jest.fn();

beforeEach(() => {
  jest.spyOn(controller.service, 'getByEmailOrUsername').mockResolvedValue(userMock);
  jest.spyOn(controller.service, 'getById').mockResolvedValue(userMock.get({ plain: true }));
});

afterAll(() => {
  models.sequelize.close();
});

describe('AuthController', () => {
  it('<login> should successfully authenticater user', async () => {
    jest.spyOn(JWTService, 'sign').mockReturnValue('token');

    const req = {
      body: {
        username: 'johnd',
        password: 'secret',
      },
    };
    const expected = {
      success: true,
      data: { token: 'token' },
    };
    const login = controller.login();

    await login(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expected);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
  it('<login> should throw exception error for incorrect password', async () => {
    const req = {
      body: {
        username: 'johnd',
        password: 'invalid',
      },
    };
    const { INVALID_CREDENTIALS } = messages;
    const error = new Unauthorized(INVALID_CREDENTIALS);
    const login = controller.login();

    await login(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('<profile> should get user profile', async () => {
    const user = userMock.get({ plain: true });
    res.locals = { authUser: userMock };
    const expected = {
      success: true,
      data: { user },
    };
    const profile = controller.profile();

    await profile({}, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expected);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
