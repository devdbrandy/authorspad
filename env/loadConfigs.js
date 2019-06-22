import { resolve } from 'path';
import { load } from 'dotenv-extended';
import { env } from '@helpers/utils';

const dotenvFile = env('NODE_ENV') === 'test' ? '.env.test' : '.env';

load({
  silent: true,
  path: resolve(__dirname, dotenvFile),
  defaults: resolve(__dirname, '.env'),
  schema: resolve(__dirname, '.env.schema'),
  errorOnMissing: true,
  errorOnExtra: true,
  errorOnRegex: false,
  overrideProcessEnv: true,
});
