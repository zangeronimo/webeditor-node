import { IPaginationResponse } from "@domain/interfaces/Base";
import { ShowUsersModel } from "@domain/models/webeditor/ShowUsersModel";
import User from "@infra/typeorm/entities/webeditor/User";

export interface IShowUsersService {
    execute(model: ShowUsersModel): Promise<IPaginationResponse<User>>
}