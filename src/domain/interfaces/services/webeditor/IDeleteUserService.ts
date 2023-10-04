import { UpdateUserModel } from "@domain/models/webeditor/UpdateUserModel";
import User from "@infra/typeorm/entities/webeditor/User";

export interface IDeleteUserService {
    execute(id: string, companyId: string): Promise<User>
}