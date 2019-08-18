import { userFactory } from '@factories/user';
import controller from '../users-controller';

const userMock = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

describe('UsersController', () => {
  it('getAllUsers() should return a list of users', async () => {
    jest.spyOn(controller.service, 'getAll').mockResolvedValue([userMock]);
    const getAllUsers = controller.getAllUsers();
    const expected = {
      success: true,
      data: { users: [userMock] },
    };

    await getAllUsers({}, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
  it('it should catch errors', async () => {
    jest.spyOn(controller.service, 'getAll').mockRejectedValue();
    const getAllUsers = controller.getAllUsers();

    await getAllUsers({}, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('getUser() should return a specific user', async () => {
    jest.spyOn(controller.service, 'getById').mockResolvedValue(userMock);
    const req = { params: { id: 1 } };
    const getUser = controller.getUser();
    const expected = {
      success: true,
      data: { user: userMock },
    };

    await getUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
  it('createUser() should return newly created user', async () => {
    jest.spyOn(controller.service, 'create').mockResolvedValue(userMock);
    const req = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
      },
    };
    const createUser = controller.createUser();
    const expected = {
      success: true,
      data: { user: userMock },
    };

    await createUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
  it('updateUser() should return updated user', async () => {
    const updatedUserMock = userFactory({ firstName: 'Mike' });
    jest.spyOn(controller.service, 'update').mockResolvedValue(updatedUserMock);
    const req = {
      body: { ...updatedUserMock },
      params: { id: 1 },
    };
    const updateUser = controller.updateUser();
    const expected = {
      success: true,
      data: { user: updatedUserMock },
    };

    await updateUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
  it('destroyUser() should respond with 204 no response', async () => {
    jest.spyOn(controller.service, 'delete').mockResolvedValue(1);
    const req = { params: { id: 1 } };
    const destroyUser = controller.destroyUser();

    await destroyUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});
