import AppError from '@infra/errors/AppError';
import { Request, Response, NextFunction } from 'express';

export default function ensureHavePermission(host: string | undefined, open = false) {
  return async (request: Request, response: Response, next: NextFunction) => {

    const referer = request.headers.referer;
    const origin = referer ? new URL(referer).origin : '';
    console.log(request);

    if (!open && (request.headers.origin !== host || !request.headers.company)) {
      throw new AppError('Invalid JWT token', 401);
    }

    return next();
  }
}
