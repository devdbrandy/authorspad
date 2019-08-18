import { DatabaseError } from 'sequelize';
import ExceptionHandler from '@helpers/exception';
import { messages } from '@helpers/constants';

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

describe('ExceptionHandler > throwErrorIfNull()', () => {
  const { RESOURCE_NOT_FOUND } = messages;

  it('should throw an Exception for nullable value', () => {
    try {
      ExceptionHandler.throwErrorIfNull(null);
    } catch (error) {
      expect(error.statusCode).toEqual(404);
      expect(error.message).toEqual(RESOURCE_NOT_FOUND);
    }
  });
  it('should throw an Exception for -1 value', () => {
    try {
      ExceptionHandler.throwErrorIfNull(-1);
    } catch (error) {
      expect(error.statusCode).toEqual(404);
      expect(error.message).toEqual(RESOURCE_NOT_FOUND);
    }
  });
  it('should return true if value is valid', () => {
    expect(ExceptionHandler.throwErrorIfNull({})).toBeTruthy();
  });
});

describe('ExceptionHandler > handleError()', () => {
  const { APP_SERVER_ERROR } = messages;
  const error = new Error(APP_SERVER_ERROR);
  const handleError = ExceptionHandler.handleError();

  it('should handle errors occurence', () => {
    const expected = {
      success: false,
      message: APP_SERVER_ERROR,
      errors: undefined,
    };
    handleError(error, {}, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
  it('should call next if header is sent', () => {
    res.headersSent = true;
    handleError(error, {}, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('ExceptionHandler > handleDatabaseError()', () => {
  const handleDatabaseError = ExceptionHandler.handleDatabaseError();

  it('should handle DatabaseError exception', () => {
    const error = new DatabaseError(new Error('db connetion failure'));
    const expected = {
      success: false,
      message: 'db connetion failure',
      errors: undefined,
    };
    handleDatabaseError(error, {}, res, next);
    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
  it('should call next if not DatabaseError', () => {
    const error = new Error();
    handleDatabaseError(error, {}, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});
