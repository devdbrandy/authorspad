import ResponseHandler from '@helpers/response';
import { messages } from '@helpers/constants';

const { RESOURCE_FOUND, APP_SERVER_ERROR } = messages;

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('ResponsHandler > send', () => {
  it('should successfully send a response object', () => {
    const expected = {
      success: true,
      message: RESOURCE_FOUND,
    };

    ResponseHandler.send(res, undefined, RESOURCE_FOUND);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(expected);
  });
});

describe('ResponsHandler > sendError', () => {
  it('should handle response with list of errors', () => {
    const error = new Error(APP_SERVER_ERROR);
    error.errors = [];
    const expected = {
      success: false,
      message: APP_SERVER_ERROR,
      errors: [],
    };

    ResponseHandler.sendError(res, error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
});
