import IImagesRepository from "@domain/interfaces/recipe/IImagesRepository";
import Image from "@infra/typeorm/entities/recipe/Image";
import { inject, injectable } from "tsyringe";

interface IRequest {
  url: string;
  active: 0 | 1;
  recipeId: string;
  companyId: string;
}

@injectable()
class CreateImageService {
  constructor(
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,
  ) { }

  public async execute({ url, active, recipeId, companyId }: IRequest): Promise<Image> {
    const image = await this.imagesRepository.create({url, active, recipeId, companyId});
    return image;
  }
}

export default CreateImageService;
