import shortUUID from 'short-uuid';
import { userFactory } from '@factories/user';

export const up = async (queryInterface) => {
  const admin = userFactory({
    id: shortUUID.generate(),
    username: 'admin',
    email: 'admin@example.com',
    password: '$2a$10$QRUIZwSPLLkS4BVJQZ75wu6LROYIqe5eKMsWYV2C21bCnUNS51NAK', // secret
    firstName: 'super',
    lastName: 'admin',
    isVerified: true,
  });

  await queryInterface.bulkInsert('Users', [admin], {});

  return queryInterface.bulkInsert('UserRoles', [
    {
      userId: admin.id,
      roleId: 1,
    },
  ], {});
};

export const down = queryInterface => new Promise([
  queryInterface.bulkDelete('UserRoles', null, {}),
  queryInterface.bulkDelete('Users', null, {}),
]);
