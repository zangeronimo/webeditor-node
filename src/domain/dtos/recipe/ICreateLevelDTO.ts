export default interface ICreateLevelDTO {
  slug: string;
  name: string;
  active?: 0 | 1;
  companyId: string;
}
