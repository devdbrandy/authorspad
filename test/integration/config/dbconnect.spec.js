import models from '@database/models';

jest.mock('@config/database', () => ({
  test: {
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
      ssl: true,
    },
  },
}));

jest.mock('sequelize', () => jest.fn(() => ({
  import: jest.fn().mockReturnValue({ name: 'file' }),
})));

describe('Sequelize connection instance', () => {
  it('should use DATABASE_URL for production', () => {
    expect(models.sequelize).toBeTruthy();
  });
});
