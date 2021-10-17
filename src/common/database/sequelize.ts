import { Sequelize } from 'sequelize';

import config from '../../config';
import setupModels from './models';


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

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: (msg) => console.log('\x1b[36m%s\x1b[0m', `Query:\n   ${msg} \n`),
});

setupModels(sequelize);

// sequelize.sync();


export default sequelize;
