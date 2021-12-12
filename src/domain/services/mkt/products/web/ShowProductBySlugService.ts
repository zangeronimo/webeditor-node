import IProductsRepository from '@domain/interfaces/mkt/IProductsRepository';
import Product from '@infra/typeorm/entities/mkt/Product';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  company_id: string;
  slug: string;
}

@injectable()
class ShowProductBySlugService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) { }

  public async execute({ company_id, slug }: IRequest): Promise<Product | undefined> {
    return await this.productsRepository.findAllBySlug(company_id, slug);
  }
}

export default ShowProductBySlugService;
