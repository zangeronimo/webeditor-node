import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import AppError from "@infra/errors/AppError";
import User from "@infra/typeorm/entities/webeditor/User";
import { inject, injectable } from "tsyringe";

import authConfig from '@infra/config/auth';
import { sign } from "jsonwebtoken";
import IHashProvider from "@infra/providers/HashProvider/models/IHashProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
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

    const token = sign({ name: user.name, company: user.webeditor_companies_id }, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user, token };
  }
}

export default AuthenticateUserService;