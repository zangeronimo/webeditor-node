export default interface ICreateRateDTO {
  rate: number;
  comment: string;
  active?: 0 | 1 | 2;
  recipeId: string;
  companyId: string;
}
