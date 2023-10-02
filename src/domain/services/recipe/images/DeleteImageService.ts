import IImagesRepository from "@domain/interfaces/recipe/IImagesRepository";
import AppError from "@infra/errors/AppError";
import Image from "@infra/typeorm/entities/recipe/Image";

interface IRequest {
  id: string;
  companyId: string;
}

class DeleteImageService {
  constructor(
    private imagesRepository: IImagesRepository,
  ) { }

  public async execute(model: IRequest): Promise<Image> {
    const image = await this.imagesRepository.findById(model.id, model.companyId);

    if (!image || image.companyId !== model.companyId) {
      throw new AppError('Image not found');
    }

    image.deletedAt = new Date();

    return this.imagesRepository.save(image);
  }
}

export default DeleteImageService;
