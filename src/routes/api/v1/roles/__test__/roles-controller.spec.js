import { roleFactory } from '@factories/role';
import controller from '../roles-controller';

const roleMock = {
  id: 1,
  name: 'writer',
  setPermissions: jest.fn().mockResolvedValue(),
  destroy: jest.fn().mockResolvedValue(),
};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  header: jest.fn(),
};
const next = jest.fn();

describe('RolesController', () => {
  it('getAllUsers should return a list of users', async () => {
    jest.spyOn(controller.service, 'getAll').mockResolvedValue([roleMock]);
    const getAllRoles = controller.getAllRoles();
    const expected = {
      success: true,
      data: { roles: [roleMock] },
    };

    await getAllRoles({}, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
  it('it should catch errors', async () => {
    jest.spyOn(controller.service, 'getAll').mockRejectedValue();
    const getAllRoles = controller.getAllRoles();

    await getAllRoles({}, res, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });
  it('getUser should return a specific user', async () => {
    jest.spyOn(controller.service, 'getById').mockResolvedValue(roleMock);
    const req = { params: { id: 1 } };
    const getRole = controller.getRole();
    const expected = {
      success: true,
      data: { role: roleMock },
    };

    await getRole(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
  it('createUser should return newly created user', async () => {
    jest.spyOn(controller.service, 'create').mockResolvedValue(roleMock);

    const req = {
      body: {
        name: 'writer',
      },
    };
    const createRole = controller.createRole();
    const expected = {
      success: true,
      data: { role: roleMock },
    };

    await createRole(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
  it('updateUser should return updated user', async () => {
    const updatedRoleMock = roleFactory({ name: 'manager' });
    jest.spyOn(controller.service, 'update').mockResolvedValue(updatedRoleMock);
    const req = {
      body: { ...updatedRoleMock },
      params: { id: 1 },
    };
    const updateRole = controller.updateRole();
    const expected = {
      success: true,
      data: { role: updatedRoleMock },
    };

    await updateRole(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
  it('destroyRole should respond with 204 no response', async () => {
    jest.spyOn(controller.service, 'getById').mockResolvedValue(roleMock);
    const destroyRole = controller.destroyRole();
    const req = { params: { id: 1 } };

    await destroyRole(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.status).toHaveBeenCalledTimes(1);
  });
});
