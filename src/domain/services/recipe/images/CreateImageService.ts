import IImagesRepository from "@domain/interfaces/recipe/IImagesRepository";
import IStorageProvider from "@infra/providers/StorageProvider/models/IStorageProvider";
import Image from "@infra/typeorm/entities/recipe/Image";
import { inject, injectable } from "tsyringe";

interface IRequest {
  file: string;
  active: 0 | 1;
  recipeId: string;
  companyId: string;
}

@injectable()
class CreateImageService {
  constructor(
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  public async execute({ file, active, recipeId, companyId }: IRequest): Promise<Image> {
    const imageUrl = await this.storageProvider.saveFile(file, `${companyId}/recipes`);
    const image = await this.imagesRepository.create({url: imageUrl, active, recipeId, companyId});
    return image;
  }
}

export default CreateImageService;
