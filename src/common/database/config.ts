const config = require('../../config');


if (!config.dbUrl) {
  throw new Error('Introduce DATABASE_URL');
}

const URI = config.dbUrl;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
    ssl: {
      rejectUnauthorized: false,
    }
  },
};
