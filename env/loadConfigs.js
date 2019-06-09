const path = require('path');
const dotEnv = require('dotenv-extended');
const { env } = require('../support/helpers');

const dotEnvFile = env('NODE_ENV') === 'test' ? '.env.test' : '.env';

dotEnv.load({
  silent: true,
  path: path.resolve(__dirname, dotEnvFile),
  defaults: path.resolve(__dirname, '.env.defaults'),
  schema: path.resolve(__dirname, '.env.schema'),
  errorOnMissing: true,
  errorOnExtra: true,
  errorOnRegex: false,
  overrideProcessEnv: true,
});
