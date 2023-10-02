import CreateProductService from "@domain/services/mkt/products/CreateProductService";
import DeleteProductService from "@domain/services/mkt/products/DeleteProductService";
import FindByIdProductService from "@domain/services/mkt/products/FindByIdProductService";
import ShowProductService from "@domain/services/mkt/products/ShowProductService";
import UpdateProductService from "@domain/services/mkt/products/UpdateProductService";
import { ProductFilter } from "@infra/typeorm/repositories/mkt/ProductsRepository";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";

export default class ProductsController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { title, slug, categoryId, active, order, page } = request.query;
    const { company } = request.user;

    // const showProducts = container.resolve(ShowProductService);

    // const products = await showProducts.execute({company_id: company, paginate: { page }, filter: { slug, title, categoryId, active } as ProductFilter, order: order && JSON.parse(order?.toString())});

    return response.json(classToClass(null));
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { company } = request.user;

    // const findProduct = container.resolve(FindByIdProductService);
    // const result = await findProduct.execute(id, company);

    return response.json(classToClass(null));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { file, title, url, content, active, categoryId } = request.body;

    // const createProduct = container.resolve(CreateProductService);

    // const product = await createProduct.execute({ file, title, content, url, active: active ?? 0, categoryId, companyId: company });

    return response.status(201).json(classToClass(null));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id, file, title, content, url, active, categoryId } = request.body;

    // const updateProduct = container.resolve(UpdateProductService);

    // const product = await updateProduct.execute({ id, file, title, content, url, active, categoryId, companyId: company });

    return response.json(classToClass(null));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id } = request.params;

    // const deleteProduct = container.resolve(DeleteProductService);

    // const product = await deleteProduct.execute({ id, companyId: company });

    return response.json(classToClass(null));
  }
}
