// @ts-ignore
import { Pool } from 'pg';
import config from '../../config';


if (!config.dbUrl) {
  throw new Error('Introduce DATABASE_URL');
}

const URI = config.dbUrl;

const pool = new Pool({ connectionStrin: URI });

export default pool;
