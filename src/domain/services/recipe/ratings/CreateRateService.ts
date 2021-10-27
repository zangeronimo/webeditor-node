import IRatingsRepository from "@domain/interfaces/recipe/IRatingsRepository";
import Rate from "@infra/typeorm/entities/recipe/Rate";
import { inject, injectable } from "tsyringe";

interface IRequest {
  rate: number;
  comment: string;
  active: 0 | 1;
  recipeId: string;
  companyId: string;
}

@injectable()
class CreateRateService {
  constructor(
    @inject('RatingsRepository')
    private ratingsRepository: IRatingsRepository,
  ) { }

  public async execute({ rate, comment, active, recipeId, companyId }: IRequest): Promise<Rate> {
    const rateCreated = await this.ratingsRepository.create({rate, comment, active, recipeId, companyId});
    return rateCreated;
  }
}

export default CreateRateService;
