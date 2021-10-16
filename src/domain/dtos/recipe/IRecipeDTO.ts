export default interface IRecipeDTO {
  slug: string;
  name: string;
  ingredients: string;
  preparation: string;
  active?: 0 | 1;
  categoryId: string;
  companyId: string;
}
