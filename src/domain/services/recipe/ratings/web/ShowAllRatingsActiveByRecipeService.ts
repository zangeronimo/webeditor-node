import IRatingsRepository from '@domain/interfaces/recipe/IRatingsRepository';
import Rate from '@infra/typeorm/entities/recipe/Rate';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowAllRatingsActiveByRecipe {
  constructor(
    @inject('RatingsRepository')
    private ratingsRepository: IRatingsRepository,
  ) { }

  public async execute(recipe_id: string, company_id: string): Promise<Rate[]> {
    return await this.ratingsRepository.findAllActiveByRecipe(recipe_id, company_id);
  }
}

export default ShowAllRatingsActiveByRecipe;
