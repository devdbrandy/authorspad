import { messages } from '@helpers/constants';
import controller from '../home-controller';

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('HomeController', () => {
  it('index() should load the API home page', async () => {
    const { WELCOME_MESSAGE } = messages;
    const index = controller.index();

    index({}, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: WELCOME_MESSAGE,
    });
  });
});
