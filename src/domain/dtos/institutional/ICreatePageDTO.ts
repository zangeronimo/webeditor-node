export default interface ICreatePageDTO {
  banner: string;
  title: string;
  content: string;
  active?: 0 | 1;
  companyId: string;
}
