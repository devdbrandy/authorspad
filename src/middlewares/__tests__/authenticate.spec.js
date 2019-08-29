import { Unauthorized, BadRequest } from 'http-errors';
import authenticate from '@middlewares/authenticate';
import JWTService from '@services/jwt-service';
import { messages } from '@helpers/constants';

const {
  NO_AUTH_TOKEN,
  INVALID_AUTH_TOKEN,
  INVALID_TOKEN_FORMAT,
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

describe('Authenticate middleware', () => {
  it('should throw an Exception for nullable token value', () => {
    const req = {
      header: jest.fn(),
    };
    const error = new Unauthorized(NO_AUTH_TOKEN);

    authenticate(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
    expect(next).toHaveBeenCalledTimes(1);
  });
  it('should throw an Exception for invalid token format', () => {
    const req = {
      header: jest.fn().mockReturnValue('token'),
    };
    const error = new BadRequest(INVALID_TOKEN_FORMAT);

    authenticate(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
    expect(next).toHaveBeenCalledTimes(1);
  });
  it('should throw an Exception for invalid access token', () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer token'),
    };
    const error = new Unauthorized(INVALID_AUTH_TOKEN);
    jwtVerify.mockReturnValue();

    authenticate(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
    expect(next).toHaveBeenCalledTimes(1);
  });
  it('should permit access for valid access token', () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer token'),
    };
    const mockUser = {
      id: 1,
      username: 'johndoe',
    };
    jwtVerify.mockReturnValue(mockUser);

    authenticate(req, res, next);
    expect(req).toHaveProperty('user', mockUser);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
