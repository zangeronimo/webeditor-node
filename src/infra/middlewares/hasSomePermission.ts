import UserHasSomeRoleService from '@domain/services/webeditor/UserHasSomeRoleService';
import AppError from '@infra/errors/AppError';
import { Request, Response, NextFunction } from 'express';

export default function hasSomeRole(roles: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    // const userHasSomeRole = container.resolve(UserHasSomeRoleService);
    // const hasRole = await userHasSomeRole.execute({ id: request.user.id, company_id: request.user.company, roles });
    // if (!hasRole) {
    //   throw new AppError('Access denied', 403);
    // }

    return next();
  }
}
