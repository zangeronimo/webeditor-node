import { IUserHasRoleService } from '@domain/interfaces/services/webeditor/IUserHasRoleService';
import AppError from '@infra/errors/AppError';
import { Request, Response, NextFunction } from 'express';

export default function hasRole(userHasRoleService: IUserHasRoleService, role: string) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const hasRole = await userHasRoleService.execute({ id: request.user.id, companyId: request.user.company, role });
    if (!hasRole) {
      throw new AppError('Access denied', 403);
    }

    return next();
  }
}
