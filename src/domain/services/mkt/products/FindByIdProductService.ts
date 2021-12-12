import IProductsRepository from '@domain/interfaces/mkt/IProductsRepository';
import Product from '@infra/typeorm/entities/mkt/Product';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindByIdProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) { }

  public async execute(id: string, company_id: string): Promise<Product | undefined> {
    return await this.productsRepository.findById(id, company_id);
  }
}

export default FindByIdProductService;
