import IImagesRepository from '@domain/interfaces/recipe/IImagesRepository';
import Image from '@infra/typeorm/entities/recipe/Image';

interface IRequest {
  companyId: string;
}

class ShowImageService {
  constructor(
    private imagesRepository: IImagesRepository,
  ) { }

  public async execute({ companyId }: IRequest): Promise<Image[]> {
    const images = await this.imagesRepository.findAll(companyId);
    return images;
  }
}

export default ShowImageService;
