import IProductsRepository from '@domain/interfaces/mkt/IProductsRepository';
import Product from '@infra/typeorm/entities/mkt/Product';

class FindByIdProductService {
  constructor(
    private productsRepository: IProductsRepository,
  ) { }

  public async execute(id: string, company_id: string): Promise<Product | undefined> {
    return await this.productsRepository.findById(id, company_id);
  }
}

export default FindByIdProductService;
