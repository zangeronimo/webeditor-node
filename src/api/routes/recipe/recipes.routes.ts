import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import { celebrate, Joi, Segments } from 'celebrate';
import RecipesController from '@api/controllers/recipe/RecipesController';

const recipesController = new RecipesController();

const recipesRouter = Router();
recipesRouter.get('/', ensureAuthenticated, hasPermission('RECIPERECIPES_VIEW'), recipesController.getAll);
recipesRouter.post('/',
celebrate({
  [Segments.BODY]: {
    slug: Joi.string().required(),
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
    categoryId: Joi.string().required(),
  }
}), ensureAuthenticated, hasPermission('RECIPERECIPES_ALTER'), recipesController.create);
recipesRouter.put('/:id',
celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    slug: Joi.string().required(),
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
    categoryId: Joi.string().required(),
    active: Joi.number().required(),
  }
}), ensureAuthenticated, hasPermission('RECIPERECIPES_ALTER'), recipesController.update);
recipesRouter.delete('/:id', ensureAuthenticated, hasPermission('RECIPERECIPES_DELETE'), recipesController.delete);

export default recipesRouter;
