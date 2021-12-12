import { IPaginationResponse } from '@domain/interfaces/Base';
import IProductsRepository from '@domain/interfaces/mkt/IProductsRepository';
import Product from '@infra/typeorm/entities/mkt/Product';
import { OrderBy } from '@infra/typeorm/repositories/BaseTypes';
import { ProductFilter } from '@infra/typeorm/repositories/mkt/ProductsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  company_id: string;
  paginate?: any;
  filter?: ProductFilter;
  order?: OrderBy;
}

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) { }

  public async execute({ company_id, paginate, filter = {}, order = { field: 'title', order: 'ASC' } }: IRequest): Promise<IPaginationResponse<Product>> {
    const products = await this.productsRepository.findAll(company_id, paginate, filter, order);
    return products;
  }
}

export default ShowProductService;
