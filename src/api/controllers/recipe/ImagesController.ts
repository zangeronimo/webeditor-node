import CreateImageService from "@domain/services/recipe/images/CreateImageService";
import DeleteImageService from "@domain/services/recipe/images/DeleteImageService";
import ShowImageService from "@domain/services/recipe/images/ShowImageService";
import UpdateImageService from "@domain/services/recipe/images/UpdateImageService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ImagesController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;

    const showImages = container.resolve(ShowImageService);

    const images = await showImages.execute({ companyId: company });

    return response.json(classToClass(images));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { url, active, recipeId } = request.body;

    const createImage = container.resolve(CreateImageService);

    const image = await createImage.execute({ url, active: active ?? 0, recipeId, companyId: company });

    return response.status(201).json(classToClass(image));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id, url,  active, recipeId } = request.body;

    const updateImage = container.resolve(UpdateImageService);

    const image = await updateImage.execute({ id, url, active, recipeId, companyId: company });

    return response.json(classToClass(image));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id } = request.params;

    const deleteImage = container.resolve(DeleteImageService);

    const image = await deleteImage.execute({ id, companyId: company });

    return response.json(classToClass(image));
  }
}
