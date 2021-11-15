import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import { celebrate, Joi, Segments } from 'celebrate';
import RatingsController from '@api/controllers/recipe/RatingsController';

const ratingsController = new RatingsController();

const ratingsRouter = Router();
ratingsRouter.get('/', ensureAuthenticated, hasPermission('RECIPERATINGS_VIEW'), ratingsController.getAll);
ratingsRouter.get('/:id', ensureAuthenticated, hasPermission('RECIPERATINGS_VIEW'), ratingsController.getById);
ratingsRouter.post('/',
celebrate({
  [Segments.BODY]: {
    rate: Joi.number().required(),
    comment: Joi.string().required(),
    recipeId: Joi.string().required(),
  }
}), ensureAuthenticated, hasPermission('RECIPERATINGS_ALTER'), ratingsController.create);
ratingsRouter.put('/:id',
celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    rate: Joi.number().required(),
    comment: Joi.string().required(),
    recipeId: Joi.string().required(),
    active: Joi.number().required(),
  }
}), ensureAuthenticated, hasPermission('RECIPERATINGS_ALTER'), ratingsController.update);
ratingsRouter.delete('/:id', ensureAuthenticated, hasPermission('RECIPERATINGS_DELETE'), ratingsController.delete);

export default ratingsRouter;
