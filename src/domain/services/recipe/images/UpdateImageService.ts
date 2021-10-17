import IImagesRepository from "@domain/interfaces/recipe/IImagesRepository";
import AppError from "@infra/errors/AppError";
import IStorageProvider from "@infra/providers/StorageProvider/models/IStorageProvider";
import Image from "@infra/typeorm/entities/recipe/Image";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  file: string;
  active: 0 | 1;
  recipeId: string;
  companyId: string;
}

@injectable()
class UpdateImageService {
  constructor(
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  public async execute(model: IRequest): Promise<Image> {
    const image = await this.imagesRepository.findById(model.id, model.companyId);

    if (!image || image.companyId !== model.companyId) {
      throw new AppError('Image not found');
    }

    if (model.file) {
      await this.storageProvider.deleteFile(image.url);
      const imageUrl = await this.storageProvider.saveFile(model.file, model.companyId);
      image.url = imageUrl;
    }
    image.active = model.active;

    return this.imagesRepository.save(image);
  }
}

export default UpdateImageService;
