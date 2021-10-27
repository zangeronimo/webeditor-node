import ICreateImageDTO from "@domain/dtos/recipe/ICreateImageDTO";
import IImagesRepository from "@domain/interfaces/recipe/IImagesRepository";
import Image from "@infra/typeorm/entities/recipe/Image";
import { getRepository, Repository } from "typeorm";

class ImagesRepository implements IImagesRepository {
  private ormRepository: Repository<Image>;

  constructor() {
    this.ormRepository = getRepository(Image);
  }

  public async findAll(companyId: string): Promise<Image[]> {
    const findImages = await this.ormRepository.find({
      where: {
        companyId,
        deletedAt: null
      },
    });
    return findImages;
  }

  public async findById(id: string, companyId: string): Promise<Image | undefined> {
    const findImage = await this.ormRepository.findOne({
      where: {
        id,
        companyId,
        deletedAt: null,
      },
    });
    return findImage;
  }

  public async findByRecipe(recipeId: string, companyId: string): Promise<Image[]> {
    const findImages = await this.ormRepository.find({
      where: {
        recipeId,
        companyId,
        deletedAt: null,
      },
    });
    return findImages;
  }

  public async create(model: ICreateImageDTO): Promise<Image> {
    const image = this.ormRepository.create(model);
    await this.ormRepository.save(image);

    return image;
  }

  public async save(image: Image): Promise<Image> {
    return this.ormRepository.save(image);
  }
}

export default ImagesRepository;
