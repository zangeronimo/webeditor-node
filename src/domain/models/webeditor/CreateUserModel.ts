export class CreateUserModel {
    constructor(
        readonly name: string,
        readonly email: string,
        readonly password: string,
        readonly companyId: string,
        readonly roles: [{ id: string }]) {}
  }