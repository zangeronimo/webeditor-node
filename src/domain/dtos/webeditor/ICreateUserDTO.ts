export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  companyId: string;
  roles: [{ id: string }]
}
