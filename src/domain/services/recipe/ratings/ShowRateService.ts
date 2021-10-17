import IRatingsRepository from '@domain/interfaces/recipe/IRatingsRepository';
import Rate from '@infra/typeorm/entities/recipe/Rate';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  companyId: string;
}

@injectable()
class ShowRateService {
  constructor(
    @inject('RatingsRepository')
    private ratingsRepository: IRatingsRepository,
  ) { }

  public async execute({ companyId }: IRequest): Promise<Rate[]> {
    const ratings = await this.ratingsRepository.findAll(companyId);
    return ratings;
  }
}

export default ShowRateService;
