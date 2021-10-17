import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import { celebrate, Joi, Segments } from 'celebrate';
import LevelsController from '@api/controllers/recipe/LevelsController';


const levelsController = new LevelsController();

const levelsRouter = Router();
levelsRouter.get('/', ensureAuthenticated, hasPermission('RECIPELEVELS_VIEW'), levelsController.getAll);
levelsRouter.post('/',
celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  }
}), ensureAuthenticated, hasPermission('RECIPELEVELS_ALTER'), levelsController.create);
levelsRouter.put('/:id',
celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    name: Joi.string().required(),
    active: Joi.number().required(),
  }
}), ensureAuthenticated, hasPermission('RECIPELEVELS_ALTER'), levelsController.update);
levelsRouter.delete('/:id', ensureAuthenticated, hasPermission('RECIPELEVELS_DELETE'), levelsController.delete);

export default levelsRouter;
