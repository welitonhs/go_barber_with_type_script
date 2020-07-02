import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import routes from './routes/index';
import uploadConfig from './config/upload';
import ExceptionHandlerErrors from './exceptions/ExceptionHandlerError';

import './database';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(ExceptionHandlerErrors);

app.listen(3333, () => {
  console.log('🚀 Server started on: http://localhost:3333');
});
