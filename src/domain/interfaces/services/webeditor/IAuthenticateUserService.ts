import { AuthenticateUserDto } from "@domain/dtos/webeditor/AuthenticateUserDto";
import { AuthenticateUserModel } from "@domain/models/webeditor/AuthenticateUserModel";

export interface IAuthenticateUserService {
    execute(model: AuthenticateUserModel): Promise<AuthenticateUserDto>
}