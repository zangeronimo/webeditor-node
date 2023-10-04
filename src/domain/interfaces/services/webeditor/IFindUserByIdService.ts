import User from "@infra/typeorm/entities/webeditor/User";

export interface IFindUserByIdService {
    execute(id: string, companyId: string): Promise<User | undefined>
}