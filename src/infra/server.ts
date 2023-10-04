import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import path from 'path';
import 'reflect-metadata';

import { Routes } from '@api/routes';
import AppError from './errors/AppError';
import BCryptHashProvider from './providers/HashProvider/implementation/BCryptHashProvider';
import { TypeOrm } from './typeorm';
import UsersRepository from './typeorm/repositories/webeditor/UsersRepository';

TypeOrm.Connect().then(() => {
  // DEPENDENCY INJECTION
  const hashProvider = new BCryptHashProvider;
  const userRepository = new UsersRepository;
  const appRoutes = new Routes(hashProvider, userRepository)

  const app = express();
  app.use(cors());
  app.use(express.json({limit: '50mb'}));
  app.use('/files', express.static(path.resolve(__dirname, '..', '..', 'upload')));
  app.use(appRoutes.Create())
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
})