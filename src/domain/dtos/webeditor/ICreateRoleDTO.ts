export default interface ICreateRoleDTO {
  name: string;
  label: string;
  order: number;
  module: { id: string };
}
