import IRatingsRepository from "@domain/interfaces/recipe/IRatingsRepository";
import AppError from "@infra/errors/AppError";
import Rate from "@infra/typeorm/entities/recipe/Rate";

interface IRequest {
  id: string;
  companyId: string;
}

class DeleteRateService {
  constructor(
    private ratingsRepository: IRatingsRepository,
  ) { }

  public async execute(model: IRequest): Promise<Rate> {
    const rate = await this.ratingsRepository.findById(model.id, model.companyId);

    if (!rate || rate.companyId !== model.companyId) {
      throw new AppError('Rate not found');
    }

    rate.deletedAt = new Date();

    return this.ratingsRepository.save(rate);
  }
}

export default DeleteRateService;
