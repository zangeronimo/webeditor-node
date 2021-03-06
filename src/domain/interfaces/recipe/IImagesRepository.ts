import ICreateImageDTO from "@domain/dtos/recipe/ICreateImageDTO";
import Image from "@infra/typeorm/entities/recipe/Image";

export default interface IImagesRepository {
  findAll(company_id: string): Promise<Image[]>;
  findById(id: string, company_id: string): Promise<Image | undefined>;
  findByRecipe(recipe_id: string, company_id: string): Promise<Image[]>;
  create(data: ICreateImageDTO): Promise<Image>;
  save(image: Image): Promise<Image>;
}
