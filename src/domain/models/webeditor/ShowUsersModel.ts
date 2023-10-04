import { OrderBy } from "@infra/typeorm/repositories/BaseTypes";
import { UserFilter } from "@infra/typeorm/repositories/webeditor/UsersRepository";

export class ShowUsersModel {
    constructor(readonly companyId: string, readonly paginate?: any, readonly filter?: UserFilter, readonly order?: OrderBy) {}
  }