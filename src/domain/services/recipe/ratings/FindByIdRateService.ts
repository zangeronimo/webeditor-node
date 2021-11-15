import IRatingsRepository from '@domain/interfaces/recipe/IRatingsRepository';
import Rate from '@infra/typeorm/entities/recipe/Rate';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindByIdRateService {
  constructor(
    @inject('RatingsRepository')
    private ratingsRepository: IRatingsRepository,
  ) { }

  public async execute(id: string, company_id: string): Promise<Rate | undefined> {
    return await this.ratingsRepository.findById(id, company_id);
  }
}

export default FindByIdRateService;
