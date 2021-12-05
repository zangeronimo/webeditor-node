import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import { celebrate, Joi, Segments } from 'celebrate';
import RatingsController from '@api/controllers/recipe/RatingsController';
import { IsNull } from 'typeorm';

const ratingsController = new RatingsController();

const ratingsRouter = Router();
ratingsRouter.get('/', ensureAuthenticated, hasPermission('RECIPERATINGS_VIEW'), ratingsController.getAll);
ratingsRouter.get('/:id', ensureAuthenticated, hasPermission('RECIPERATINGS_VIEW'), ratingsController.getById);
ratingsRouter.post('/',
celebrate({
  [Segments.BODY]: {
    name: Joi.any(),
    rate: Joi.number().required(),
    comment: Joi.any(),
    recipeId: Joi.string().required(),
  }
}), ensureAuthenticated, hasPermission('RECIPERATINGS_ALTER'), ratingsController.create);
ratingsRouter.put('/:id',
celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    name: Joi.any(),
    rate: Joi.number().required(),
    comment: Joi.any(),
    recipeId: Joi.string().required(),
    active: Joi.number().required(),
  }
}), ensureAuthenticated, hasPermission('RECIPERATINGS_ALTER'), ratingsController.update);
ratingsRouter.delete('/:id', ensureAuthenticated, hasPermission('RECIPERATINGS_DELETE'), ratingsController.delete);

export default ratingsRouter;
