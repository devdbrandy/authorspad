import ResponsHandler from '@helpers/responseHandler';
import { messages } from '@helpers/constants';

const { RESOURCE_FOUND, RESOURCE_NOT_FOUND } = messages;

let mockRes;
let resJson;

beforeAll(() => {
  resJson = jest.fn();
  mockRes = {
    status: jest.fn(() => ({ json: resJson })),
  };
});

afterAll(() => jest.resetAllMocks());

describe('ResponsHandler > send', () => {
  it('should successfully send a response object', () => {
    const [message] = RESOURCE_FOUND;
    ResponsHandler.send(mockRes, [message]);
    const expected = {
      success: true,
      data: {},
      message,
    };
    expect(mockRes.status).toBeCalledWith(200);
    expect(resJson).toBeCalledWith(expected);
  });
  it('should include an errorCode for error response', () => {
    const [message, code] = RESOURCE_NOT_FOUND;
    ResponsHandler.send(mockRes, message, {}, 404, code);
    const expected = {
      success: false,
      data: {},
      errorCode: code,
      message,
    };
    expect(mockRes.status).toBeCalledWith(404);
    expect(resJson).toBeCalledWith(expected);
  });
});
