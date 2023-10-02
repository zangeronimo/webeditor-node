import IRatingsRepository from "@domain/interfaces/recipe/IRatingsRepository";
import AppError from "@infra/errors/AppError";
import Rate from "@infra/typeorm/entities/recipe/Rate";

interface IRequest {
  id: string;
  name: string;
  rate: number;
  comment: string;
  active: 0 | 1;
  recipeId: string;
  companyId: string;
}

class UpdateRateService {
  constructor(
    private ratingsRepository: IRatingsRepository,
  ) { }

  public async execute(model: IRequest): Promise<Rate> {
    const rate = await this.ratingsRepository.findById(model.id, model.companyId);

    if (!rate || rate.companyId !== model.companyId) {
      throw new AppError('Rate not found');
    }

    rate.name = model.name;
    rate.rate = model.rate;
    rate.comment = model.comment;
    rate.active = model.active;

    return this.ratingsRepository.save(rate);
  }
}

export default UpdateRateService;
