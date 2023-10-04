import { CreateUserModel } from "@domain/models/webeditor/CreateUserModel";
import User from "@infra/typeorm/entities/webeditor/User";

export interface ICreateUserService {
    execute(model: CreateUserModel): Promise<User>
}