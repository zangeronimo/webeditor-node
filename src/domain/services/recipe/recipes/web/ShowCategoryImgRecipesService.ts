import IRecipesRepository from '@domain/interfaces/recipe/IRecipesRepository';
import Recipe from '@infra/typeorm/entities/recipe/Recipe';

interface IRequest {
  company_id: string;
  category_id: string;
}

class ShowCategoryImgRecipesService {
  constructor(
    private recipesRepository: IRecipesRepository,
  ) { }

  public async execute({ company_id, category_id }: IRequest): Promise<Recipe[]> {
    return await this.recipesRepository.findAllCategoryImg(company_id, category_id);
  }
}

export default ShowCategoryImgRecipesService;
