export default interface ICreateRecipeDTO {
  slug: string;
  banner: string;
  title: string;
  content: string;
  active?: 0 | 1;
  categoryId: string;
  companyId: string;
}
