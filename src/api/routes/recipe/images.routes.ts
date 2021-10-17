import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import { celebrate, Joi, Segments } from 'celebrate';
import ImagesController from '@api/controllers/recipe/ImagesController';

const imagesController = new ImagesController();

const imagesRouter = Router();
imagesRouter.get('/', ensureAuthenticated, hasPermission('RECIPEIMAGES_VIEW'), imagesController.getAll);
imagesRouter.post('/',
celebrate({
  [Segments.BODY]: {
    url: Joi.string().required(),
    recipeId: Joi.string().required(),
  }
}), ensureAuthenticated, hasPermission('RECIPEIMAGES_ALTER'), imagesController.create);
imagesRouter.put('/:id',
celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    url: Joi.string().required(),
    recipeId: Joi.string().required(),
  }
}), ensureAuthenticated, hasPermission('RECIPEIMAGES_ALTER'), imagesController.update);
imagesRouter.delete('/:id', ensureAuthenticated, hasPermission('RECIPEIMAGES_DELETE'), imagesController.delete);

export default imagesRouter;
