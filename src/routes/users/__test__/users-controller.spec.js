import UserService from '@services/user-service';
import { messages } from '@helpers/constants';
import controller from '../users-controller';

const { RESOURCE_FOUND } = messages;

describe('UsersController', () => {
  let [res, next] = [];

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('it should successfully send a response', async () => {
    const userMock = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
    };

    jest.spyOn(UserService, 'findAll').mockResolvedValue([userMock]);
    jest.spyOn(controller, 'sendResponse').mockReturnValue();
    const getAllUsers = controller.getAllUsers();
    await getAllUsers({}, res, next);
    expect(controller.sendResponse).toHaveBeenCalled();
    expect(controller.sendResponse)
      .toHaveBeenCalledWith(res, RESOURCE_FOUND, { users: [userMock] });
  });
  it('it should catch errors', async () => {
    jest.spyOn(UserService, 'findAll').mockRejectedValue();
    const getAllUsers = controller.getAllUsers();
    await getAllUsers({}, res, next);
    expect(next).toHaveBeenCalled();
  });
});
