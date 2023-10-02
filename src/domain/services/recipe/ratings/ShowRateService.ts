import { IPaginationResponse } from '@domain/interfaces/Base';
import IRatingsRepository from '@domain/interfaces/recipe/IRatingsRepository';
import Rate from '@infra/typeorm/entities/recipe/Rate';
import { OrderBy } from '@infra/typeorm/repositories/BaseTypes';
import { RateFilter } from '@infra/typeorm/repositories/recipe/RatingsRepository';

interface IRequest {
  company_id: string;
  paginate?: any;
  filter?: RateFilter;
  order?: OrderBy;
}

class ShowRateService {
  constructor(
    private ratingsRepository: IRatingsRepository,
  ) { }

  public async execute({ company_id, paginate, filter = {}, order = { field: 'created_at', order: 'DESC' } }: IRequest): Promise<IPaginationResponse<Rate>> {
    const ratings = await this.ratingsRepository.findAll(company_id, paginate, filter, order);
    return ratings;
  }
}

export default ShowRateService;
