import ICreateProductDTO from "@domain/dtos/mkt/ICreateProductDTO";
import { IPaginationResponse } from "@domain/interfaces/Base";
import IProductsRepository from "@domain/interfaces/mkt/IProductsRepository";
import Product from "@infra/typeorm/entities/mkt/Product";
import { getRepository, Repository } from "typeorm";
import { OrderBy } from "../BaseTypes";

export type ProductFilter = {
  id?: string;
  slug?: string;
  title?: string;
  categoryId?: string;
  active?: 0 | 1;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAll(companyId: string, paginate: any, filter: ProductFilter, order: OrderBy): Promise<IPaginationResponse<Product>> {

    const builder = this.ormRepository.createQueryBuilder('products');
    builder.innerJoinAndSelect('products.company', 'company');
    builder.innerJoinAndSelect('products.category', 'category');

    builder.where('products.companyId = :co', { co: companyId});

    if (filter.slug)
      builder.andWhere("unaccent(lower(products.slug)) LIKE unaccent(:rs)", {rs: `%${filter.slug.toLowerCase()}%`})
    if (filter.title)
      builder.andWhere("unaccent(lower(products.title)) LIKE unaccent(:rn)", {rn: `%${filter.title.toLowerCase()}%`})
    if (filter.categoryId)
      builder.andWhere("products.categoryId = :rc", {rc: filter.categoryId});
    if (filter.active)
      builder.andWhere("products.active = :ra", {ra: filter.active});

    builder.orderBy(`products.${order.field}`, order.order);

    const { page = 1, perPage = 20 } = paginate;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);
    return { data: await builder.getMany(), total };
  }

  public async findById(id: string, companyId: string): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: {
        id,
        companyId,
        deletedAt: null,
      },
      relations: ['category'],
    });
    return findProduct;
  }

  public async findAllBySlug(companyId: string, slug: string): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: {
        slug,
        companyId,
        deletedAt: null,
      },
      relations: ['category'],
    });
    return findProduct;
  }

  public async findByCategory(categoryId: string, companyId: string): Promise<Product[]> {
    const findProducts = await this.ormRepository.find({
      where: {
        categoryId,
        companyId,
        deletedAt: null,
      },
    });
    return findProducts;
  }

  public async create(model: ICreateProductDTO): Promise<Product> {
    const recipe = this.ormRepository.create(model);
    await this.ormRepository.save(recipe);

    return recipe;
  }

  public async save(recipe: Product): Promise<Product> {
    return this.ormRepository.save(recipe);
  }
}

export default ProductsRepository;
