import ResponsHandler from '@helpers/response-handler';
import { messages } from '@helpers/constants';

const { RESOURCE_FOUND, RESOURCE_NOT_FOUND } = messages;

let res;

beforeEach(() => {
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
});

describe('ResponsHandler > send', () => {
  it('should successfully send a response object', () => {
    const [message] = RESOURCE_FOUND;
    ResponsHandler.send(res, [message]);
    const expected = {
      success: true,
      message,
    };
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(expected);
  });
  it('should include an errorCode for error response', () => {
    const [message, code] = RESOURCE_NOT_FOUND;
    ResponsHandler.send(res, message, [], 404, code);
    const expected = {
      success: false,
      errors: [],
      errorCode: code,
      message,
    };
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith(expected);
  });
});
