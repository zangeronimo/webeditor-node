import ICategoriesRepository from "@domain/interfaces/mkt/ICategoriesRepository";
import AppError from "@infra/errors/AppError";
import Category from "@infra/typeorm/entities/mkt/Category";

interface IRequest {
  id: string;
  companyId: string;
}

class DeleteCategoryService {
  constructor(
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute(model: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(model.id, model.companyId);

    if (!category || category.companyId !== model.companyId) {
      throw new AppError('Category not found');
    }

    category.deletedAt = new Date();

    return this.categoriesRepository.save(category);
  }
}

export default DeleteCategoryService;
