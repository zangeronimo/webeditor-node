import { UpdateUserModel } from "@domain/models/webeditor/UpdateUserModel";
import User from "@infra/typeorm/entities/webeditor/User";

export interface IUpdateUserService {
    execute(model: UpdateUserModel): Promise<User>
}