import AppError from '@infra/errors/AppError';
import { Request, Response, NextFunction } from 'express';

export default function ensureHavePermission(host: string | undefined, open = false) {
  return async (request: Request, response: Response, next: NextFunction) => {

    if (!open && (request.headers.origin !== host || !request.headers.company)) {
      throw new AppError('Invalid JWT token', 401);
    }

    return next();
  }
}
