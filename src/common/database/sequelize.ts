import { Sequelize } from 'sequelize';

import config from '../../config';
import setupModels from './models';


if (!config.dbUrl) {
  throw new Error('Introduce DATABASE_URL');
}

const URI = config.dbUrl;

const options: any = {
  dialect: 'postgres',
  logging: config.isProd ? false : (msg: any) => console.log('\x1b[36m%s\x1b[0m', `Query:\n   ${msg} \n`),
};

if (config.isProd) {
  options.ssl = {
    rejectUnauthorized: false
  };
}

const sequelize = new Sequelize(URI, options);

setupModels(sequelize);


// Remove in case of going to production
// sequelize.sync();


export default sequelize;
