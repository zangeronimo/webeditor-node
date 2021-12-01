export default interface ICreateCategoryDTO {
  slug: string;
  name: string;
  active?: 0 | 1;
  levelId: string;
  companyId: string;
}
