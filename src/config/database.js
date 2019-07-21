import { env } from '@helpers/utils';

const environment = env('NODE_ENV', 'development');
let options = {};
if (environment === 'production') {
  options = {
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
      ssl: true,
    },
  };
}

module.exports = {
  [environment]: {
    username: env('DB_USERNAME', 'postgres'),
    password: env('DB_PASSWORD', null),
    database: env('DB_DATABASE', 'irobot'),
    host: env('DB_HOST', '127.0.0.1'),
    dialect: env('DB_CONNECTION', 'postgres'),
    logging: env('DB_LOGGING', false),
    ...options,
  },
};
