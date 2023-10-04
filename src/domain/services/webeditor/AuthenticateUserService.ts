import IUsersRepository from '@domain/interfaces/webeditor/IUsersRepository';
import AppError from '@infra/errors/AppError';

import authConfig from '@api/config/auth';
import { sign } from 'jsonwebtoken';
import IHashProvider from '@infra/providers/HashProvider/models/IHashProvider';
import { IAuthenticateUserService } from '@domain/interfaces/services/webeditor/IAuthenticateUserService';
import { AuthenticateUserModel } from '@domain/models/webeditor/AuthenticateUserModel';
import { AuthenticateUserDto } from '@domain/dtos/webeditor/AuthenticateUserDto';

class AuthenticateUserService implements IAuthenticateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email, password }: AuthenticateUserModel): Promise<AuthenticateUserDto> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const roles = user.roles.map(role => role.name);

    const token = sign({ name: user.name, avatar: user.avatar, company: user.companyId, roles }, secret, {
      subject: user.id,
      expiresIn,
    });
    return new AuthenticateUserDto(token);
  }
}

export default AuthenticateUserService;
