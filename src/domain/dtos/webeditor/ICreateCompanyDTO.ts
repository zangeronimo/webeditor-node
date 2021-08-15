import Module from "@infra/typeorm/entities/webeditor/Module";

export default interface ICreateCompanyDTO {
  name: string;
  modules: Module[]
}
