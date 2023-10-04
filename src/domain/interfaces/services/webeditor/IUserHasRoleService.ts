import { UserHasRoleModel } from "@domain/models/webeditor/UserHasRoleModel";

export interface IUserHasRoleService {
    execute(model: UserHasRoleModel): Promise<boolean>
}