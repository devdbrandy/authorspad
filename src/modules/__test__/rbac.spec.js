import RBAC from '../rbac';

describe('Role Based Access Control Module', () => {
  const roleOptions = [
    {
      name: 'guest',
      permissions: ['read'],
      parentRole: null,
    },
  ];

  it('should create an instance with roles definition', () => {
    const expectedDefinition = {
      guest: {
        can: { read: 1 },
        inherits: [],
      },
    };

    const rbac = new RBAC(roleOptions);
    expect(rbac.roles).toEqual(expectedDefinition);
  });
  it('should create owner policy if ownership is true', () => {
    const writerRole = {
      name: 'writer',
      permissions: ['write', 'edit'],
      ownership: true,
      parentRole: {
        name: 'guest',
        permissions: ['read'],
      },
    };
    roleOptions.push(writerRole);

    const rbac = new RBAC(roleOptions);

    expect(rbac.roles).toHaveProperty('writer');
    expect(typeof rbac.roles.writer.can.edit).toEqual('function');
    expect(rbac.can('writer', 'read')).toBeTruthy();
  });
  it('should deny invalid roles', () => {
    const rbac = new RBAC(roleOptions);

    expect(rbac.can('unknown')).toBeFalsy();
  });
});
