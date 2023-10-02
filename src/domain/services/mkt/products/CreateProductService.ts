import IProductsRepository from "@domain/interfaces/mkt/IProductsRepository";
import { slugGenerate } from "@domain/utils/slugGenerate";
import AppError from "@infra/errors/AppError";
import IStorageProvider from "@infra/providers/StorageProvider/models/IStorageProvider";
import Product from "@infra/typeorm/entities/mkt/Product";

interface IRequest {
  file: string;
  title: string;
  content: string;
  url: string;
  active: 0 | 1;
  categoryId: string;
  companyId: string;
}

class CreateProductService {
  constructor(
    private productsRepository: IProductsRepository,
    private storageProvider: IStorageProvider,
  ) { }

  public async execute({ file, title, content, url, active, categoryId, companyId }: IRequest): Promise<Product> {
    const slug = slugGenerate(title);

    const existsProduct = await this.productsRepository.findAllBySlug(companyId, slug);
    if (!!existsProduct) {
      throw new AppError('Ops, já existe um produto com esse nome.');
    }

    const banner = await this.storageProvider.saveFile(file, `${companyId}/mkts`);
    const product = await this.productsRepository.create({slug, banner, title, content, url, active, categoryId, companyId});

    return product;
  }
}

export default CreateProductService;
