import IProductsRepository from "@domain/interfaces/mkt/IProductsRepository";
import AppError from "@infra/errors/AppError";
import IStorageProvider from "@infra/providers/StorageProvider/models/IStorageProvider";
import Product from "@infra/typeorm/entities/mkt/Product";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  file: string;
  title: string;
  content: string;
  active: 0 | 1;
  categoryId: string;
  companyId: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  public async execute(model: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(model.id, model.companyId);

    if (!product || product.companyId !== model.companyId) {
      throw new AppError('Product not found');
    }

    if(model.file) {
      product.banner = await this.storageProvider.saveFile(model.file, `${product.companyId}/mkts`);
    }

    product.title = model.title;
    product.content = model.content;
    product.active = model.active;
    product.categoryId = model.categoryId;

    const updatedProduct =  await this.productsRepository.save(product);

    return updatedProduct;
  }
}

export default UpdateProductService;
