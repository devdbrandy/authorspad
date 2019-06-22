require('@babel/register');
require('./env/loadConfig');

module.exports = {
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  globalSetup: '<rootDir>/test/setup.js',
  globalTeardown: '<rootDir>/test/teardown.js',
  watchPlugins: [
    ['jest-watch-master', { branch: 'develop' }],
  ],
};
