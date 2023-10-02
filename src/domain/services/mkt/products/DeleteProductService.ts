import IProductsRepository from "@domain/interfaces/mkt/IProductsRepository";
import AppError from "@infra/errors/AppError";
import Product from "@infra/typeorm/entities/mkt/Product";

interface IRequest {
  id: string;
  companyId: string;
}

class DeleteProductService {
  constructor(
    private productsRepository: IProductsRepository,
  ) { }

  public async execute(model: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(model.id, model.companyId);

    if (!product || product.companyId !== model.companyId) {
      throw new AppError('Product not found');
    }

    const now = new Date();
    product.slug = now.getTime().toString();
    product.deletedAt = now;

    return this.productsRepository.save(product);
  }
}

export default DeleteProductService;
