import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import ExceptionHandlerErrors from '@shared/exceptions/ExceptionHandlerError';
import routes from './routes/index';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);
app.use(ExceptionHandlerErrors);

app.listen(3333, () => {
  console.log('🚀 Server started on: http://localhost:3333');
});
