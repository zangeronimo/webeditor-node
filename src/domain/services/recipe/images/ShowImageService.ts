import IImagesRepository from '@domain/interfaces/recipe/IImagesRepository';
import Image from '@infra/typeorm/entities/recipe/Image';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  companyId: string;
}

@injectable()
class ShowImageService {
  constructor(
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,
  ) { }

  public async execute({ companyId }: IRequest): Promise<Image[]> {
    const images = await this.imagesRepository.findAll(companyId);
    return images;
  }
}

export default ShowImageService;
