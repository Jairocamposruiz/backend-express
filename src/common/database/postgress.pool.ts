const { Pool } = require('pg');

import config from '../../config';


const { dbUser, dbPassword, dbHost, dbPort, dbName } = config;

if (!dbPassword || !dbUser) {
  throw new Error('Introduce database credentials (Environments Variables)');
}

if (!dbHost || !dbPort || !dbName) {
  throw new Error('Introduce database config (Environments Variables)');
}

const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

const pool = new Pool({ connectionStrin: URI });

export default pool;
