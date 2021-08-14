import IUsersRepository from '@domain/interfaces/webeditor/IUsersRepository';
import AppError from '@infra/errors/AppError';
import User from '@infra/typeorm/entities/webeditor/User';
import { inject, injectable } from 'tsyringe';

import authConfig from '@api/config/auth';
import { sign } from 'jsonwebtoken';
import IHashProvider from '@infra/providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
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

    const token = sign({ name: user.name, company: user.companyId, roles }, secret, {
      subject: user.id,
      expiresIn,
    });
    return { token };
  }
}

export default AuthenticateUserService;
