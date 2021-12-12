export default interface ICreateCategoryDTO {
  slug: string;
  name: string;
  active?: 0 | 1;
  companyId: string;
}
