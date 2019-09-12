export const up = queryInterface => Promise.all([
  queryInterface.bulkInsert('Permissions', [
    { scope: 'read' },
    { scope: 'write' },
    { scope: 'edit' },
    { scope: 'delete' },
    { scope: 'article:read' },
    { scope: 'article:write' },
    { scope: 'article:edit' },
    { scope: 'article:delete' },
    { scope: 'article:publish' },
    { scope: 'user:read' },
    { scope: 'user:write' },
    { scope: 'user:edit' },
    { scope: 'user:delete' },
  ], {}),
  queryInterface.bulkInsert('Roles', [
    {
      name: 'admin',
      title: 'Administrator',
      ownership: false,
    },
    {
      name: 'manager',
      parent: 3,
      ownership: false,
    },
    {
      name: 'writer',
      ownership: true,
      parent: 4,
    },
    { name: 'guest' },
  ], {}),
  queryInterface.bulkInsert('RolePermissions', [
    // Guest
    { roleId: 4, permissionId: 5 },
    // Writer
    { roleId: 3, permissionId: 6 },
    { roleId: 3, permissionId: 7 },
    { roleId: 3, permissionId: 8 },
    { roleId: 3, permissionId: 10 },
    { roleId: 3, permissionId: 11 },
    { roleId: 3, permissionId: 12 },
    { roleId: 3, permissionId: 13 },
    // Manager
    { roleId: 2, permissionId: 9 },
    // Admin
    { roleId: 1, permissionId: 1 },
    { roleId: 1, permissionId: 2 },
    { roleId: 1, permissionId: 3 },
    { roleId: 1, permissionId: 4 },
    { roleId: 1, permissionId: 5 },
    { roleId: 1, permissionId: 6 },
    { roleId: 1, permissionId: 7 },
    { roleId: 1, permissionId: 8 },
    { roleId: 1, permissionId: 9 },
    { roleId: 1, permissionId: 10 },
    { roleId: 1, permissionId: 11 },
    { roleId: 1, permissionId: 12 },
    { roleId: 1, permissionId: 13 },
  ], {}),
]);

export const down = queryInterface => Promise.all([
  queryInterface.bulkDelete('RolePermissions', null, {}),
  queryInterface.bulkDelete('Permissions', null, {}),
  queryInterface.bulkDelete('Roles', null, {}),
]);
