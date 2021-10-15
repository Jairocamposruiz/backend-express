const { Pool } = require('pg');

import config from '../../config';


const { dbUser, dbPassword, dbHost, dbPort, dbName } = config;

if (!dbPassword || !dbUser) {
  throw new Error('Introduce database credentials');
}

const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

const pool = new Pool({ connectionString: URI });

export default pool;
