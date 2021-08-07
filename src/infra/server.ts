import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import routes from '@api/routes';
import AppError from './errors/AppError';

import './typeorm';
import './container';

const app = express();

app.use(cors());
app.use(express.json());
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
