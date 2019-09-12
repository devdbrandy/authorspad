import models from '@database/models';
import RoleFactory from '@factories/role';
import RoleService from '../role-service';
import BaseService from '../base-service';

const { Model } = models.Sequelize;
let mockRole;

afterAll(() => {
  models.sequelize.close();
});

describe('RoleService Integration', () => {
  it('should extend BaseService', () => {
    expect(RoleService).toBeInstanceOf(BaseService);
  });
});

describe('RoleService > getById', () => {
  beforeAll(async () => {
    mockRole = await RoleFactory();
  });

  it('should return a single role object by id', async () => {
    const { id } = mockRole;
    const result = await RoleService.getById(id, { plain: true });
    expect(result).toHaveProperty('name', mockRole.name);
    expect(result.parentRole).toBeNull();
  });
  it('should return a model instance by id', async () => {
    const { id } = mockRole;
    const result = await RoleService.getById(id);
    expect(result).toBeInstanceOf(Model);
  });
});

describe('RoleService > serializeData', () => {
  it('should return a serialized data format for roles and permissions', async () => {
    const mockData = [{
      id: 1,
      name: 'writer',
      permissions: [],
      parentRole: {
        name: 'guest',
        permissions: [{ scope: 'read' }],
      },
    }];

    const result = RoleService.constructor.serializeData(mockData);
    // expect(result[0]).toHaveProperty('permissions', ['write']);
    expect(result[0].parentRole).toHaveProperty('permissions', ['read']);
  });
});
