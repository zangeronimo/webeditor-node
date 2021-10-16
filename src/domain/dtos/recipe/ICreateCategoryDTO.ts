export default interface ICreateCategoryDTO {
  name: string;
  active?: 0 | 1;
  levelId: string;
  companyId: string;
}
