import ICreateProductDTO from "@domain/dtos/mkt/ICreateProductDTO";
import Product from "@infra/typeorm/entities/mkt/Product";
import { OrderBy } from "@infra/typeorm/repositories/BaseTypes";
import { ProductFilter } from "@infra/typeorm/repositories/mkt/ProductsRepository";
import { IPaginationResponse } from "../Base";

export default interface IProductsRepository {
  findAll(company_id: string, paginate: any, filter: ProductFilter, order: OrderBy): Promise<IPaginationResponse<Product>>;
  findAllBySlug(company_id: string, slug: string): Promise<Product | undefined>;
  findById(id: string, company_id: string): Promise<Product | undefined>;
  findByCategory(category_id: string, company_id: string): Promise<Product[]>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(Product: Product): Promise<Product>;
}
