import Role from "@infra/typeorm/entities/webeditor/Role";

export class UpdateUserModel {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly email: string,
        readonly password: string,
        readonly companyId: string,
        readonly roles: Role[]) {}
  }