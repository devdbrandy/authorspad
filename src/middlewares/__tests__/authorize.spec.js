import { Unauthorized, BadRequest } from 'http-errors';
import AuthGuard from '@middlewares/authorize';
import JWTService from '@services/jwt-service';
import UserService from '@services/user-service';
import RoleService from '@services/role-service';
import { messages } from '@helpers/constants';

const {
  NO_AUTH_TOKEN,
  INVALID_AUTH_TOKEN,
  INVALID_TOKEN_FORMAT,
  ACCESS_DENIED,
} = messages;

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();
let jwtVerify;

beforeEach(() => {
  jwtVerify = jest.spyOn(JWTService, 'verify');
});

describe('Authenticate Guard', () => {
  it('should throw an Exception for nullable token value', async () => {
    const req = {
      header: jest.fn(),
    };
    const error = new Unauthorized(NO_AUTH_TOKEN);

    await AuthGuard.authenticateGuard(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
    expect(next).toHaveBeenCalledTimes(1);
  });
  it('should throw an Exception for invalid token format', async () => {
    const req = {
      header: jest.fn().mockReturnValue('token'),
    };
    const error = new BadRequest(INVALID_TOKEN_FORMAT);

    await AuthGuard.authenticateGuard(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
    expect(next).toHaveBeenCalledTimes(1);
  });
  it('should throw an Exception for invalid access token', async () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer token'),
    };
    const error = new Unauthorized(INVALID_AUTH_TOKEN);
    jwtVerify.mockReturnValue();

    await AuthGuard.authenticateGuard(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
    expect(next).toHaveBeenCalledTimes(1);
  });
  it('should permit access for valid access token', async () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer token'),
    };
    const mockUser = {
      id: 1,
      username: 'johndoe',
    };
    jwtVerify.mockReturnValue(mockUser);
    jest.spyOn(UserService, 'getById').mockResolvedValue(mockUser);

    await AuthGuard.authenticateGuard(req, res, next);
    expect(req).toHaveProperty('user', mockUser);
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe('Authorize Guard', () => {
  const req = {
    user: { id: 'usr123', roles: ['writer'] },
  };

  const mockRoles = [
    {
      id: 3,
      name: 'writer',
      parentRole: null,
      permissions: ['write'],
    },
  ];

  beforeEach(() => {
    jest.spyOn(RoleService, 'getAll').mockResolvedValue(mockRoles);
  });

  it('should throw an Exception for invalid access right', async () => {
    const error = new Unauthorized(ACCESS_DENIED);
    const authenticateGuard = AuthGuard.authorizeGuard('edit');

    res.locals = {
      resourceName: 'article',
      article: { userId: 'user23' },
    };

    await authenticateGuard(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
