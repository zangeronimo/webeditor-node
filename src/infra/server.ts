import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { errors } from 'celebrate';
import 'express-async-errors';
import swagger from 'swagger-ui-express';

import routes from '@api/routes';

import swaggerJson from '../swagger.json';
import AppError from './errors/AppError';

import './typeorm';
import './container';

const app = express();

app.use(cors({
 origin: ['http://localhost:3000']
}));
app.use(express.json({limit: '50mb'}));
app.use('/files', express.static(path.resolve(__dirname, '..', '..', 'upload')));
app.use('/api-docs', swagger.serve, swagger.setup(swaggerJson));
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const defaultPort = 3333;
app.listen(defaultPort, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${defaultPort}`);
});
