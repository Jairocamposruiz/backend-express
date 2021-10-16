import express from 'express';
import path from 'path';
const cors = require('cors');

import routerApi from './router';
import { logErrors, errorHandler, boomErrorHandler, sequelizeErrorHandler } from './common/middlewares/error.handler';


// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors configuration
/*const whitelist = ['http://localhost:8080','http://localhost:63345' ,'https://myapp.com', 'https://myotherapp.es'];
const options = {
  origin: (origin: string, callback: Function) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed'))
    }
  }
};
app.use(cors(options));*/
app.use(cors())


app.use(
  express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 })
);

routerApi(app);

app.use(boomErrorHandler);
app.use(sequelizeErrorHandler);
app.use(logErrors);
app.use(errorHandler);


export default app;
