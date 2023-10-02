import IRecipesRepository from '@domain/interfaces/recipe/IRecipesRepository';
import Recipe from '@infra/typeorm/entities/recipe/Recipe';

interface IRequest {
  company_id: string;
  slug: string;
}

class ShowRecipeBySlugService {
  constructor(
    private recipesRepository: IRecipesRepository,
  ) { }

  public async execute({ company_id, slug }: IRequest): Promise<Recipe | undefined> {
    return await this.recipesRepository.findAllBySlug(company_id, slug);
  }
}

export default ShowRecipeBySlugService;
