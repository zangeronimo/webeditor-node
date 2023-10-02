import IRatingsRepository from '@domain/interfaces/recipe/IRatingsRepository';
import Rate from '@infra/typeorm/entities/recipe/Rate';

class ShowAllRatingsActiveByRecipe {
  constructor(
    private ratingsRepository: IRatingsRepository,
  ) { }

  public async execute(recipe_id: string, company_id: string): Promise<Rate[]> {
    return await this.ratingsRepository.findAllActiveByRecipe(recipe_id, company_id);
  }
}

export default ShowAllRatingsActiveByRecipe;
