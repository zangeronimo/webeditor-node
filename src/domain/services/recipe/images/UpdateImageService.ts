import IImagesRepository from "@domain/interfaces/recipe/IImagesRepository";
import AppError from "@infra/errors/AppError";
import Image from "@infra/typeorm/entities/recipe/Image";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  url: string;
  active: 0 | 1;
  recipeId: string;
  companyId: string;
}

@injectable()
class UpdateImageService {
  constructor(
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,
  ) { }

  public async execute(model: IRequest): Promise<Image> {
    const image = await this.imagesRepository.findById(model.id, model.companyId);

    if (!image || image.companyId !== model.companyId) {
      throw new AppError('Image not found');
    }

    image.url = model.url;
    image.active = model.active;

    return this.imagesRepository.save(image);
  }
}

export default UpdateImageService;
