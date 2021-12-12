import ICategoriesRepository from "@domain/interfaces/mkt/ICategoriesRepository";
import AppError from "@infra/errors/AppError";
import Category from "@infra/typeorm/entities/mkt/Category";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  name: string;
  active: 0 | 1;
  companyId: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('MkttegoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute(model: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(model.id, model.companyId);

    if (!category || category.companyId !== model.companyId) {
      throw new AppError('Category not found');
    }

    category.name = model.name;
    category.active = model.active;

    return this.categoriesRepository.save(category);
  }
}

export default UpdateCategoryService;
