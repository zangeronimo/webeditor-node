import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@infra/config/auth';
import AppError from '@infra/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  company: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // token JWT Validation

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Invalid JWT token', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret ?? '');

    const { sub, company } = decoded as ITokenPayload;

    request.user = { id: sub, company: 'bb836305-c785-4f72-b49a-690c2ec6f7c3' };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}