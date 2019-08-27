require('@babel/register');
require('./env/load-config');

module.exports = {
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/bin',
    '<rootDir>/src/database/migrations',
    '<rootDir>/src/database/seeders',
  ],
  globalSetup: '<rootDir>/test/setup.js',
  globalTeardown: '<rootDir>/test/teardown.js',
  clearMocks: true,
  restoreMocks: true,
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/?(*.)(spec|test).js',
    '<rootDir>/src/**/?(*.)(spec|test).js',
    '<rootDir>/test/**/?(*.)(spec|test).js',
  ],
  watchPlugins: [
    ['jest-watch-master', { branch: 'develop' }],
  ],
};
