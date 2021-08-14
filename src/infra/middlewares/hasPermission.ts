import UserHasRoleService from '@domain/services/webeditor/UserHasRoleService';
import AppError from '@infra/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

export default function hasRole(role: string) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const userHasRole = container.resolve(UserHasRoleService);
    const hasRole = await userHasRole.execute({ id: request.user.id, company_id: request.user.company, role });
    if (!hasRole) {
      throw new AppError('Access denied', 403);
    }

    return next();
  }
}
