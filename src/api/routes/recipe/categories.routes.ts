import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import { celebrate, Joi, Segments } from 'celebrate';
import CategoriesController from '@api/controllers/recipe/CategoriesController';

const categoriesController = new CategoriesController();

const categoriesRouter = Router();
categoriesRouter.get('/', ensureAuthenticated, hasPermission('RECIPECATEGORIES_VIEW'), categoriesController.getAll);
categoriesRouter.post('/',
celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    levelId: Joi.string().required(),
  }
}), ensureAuthenticated, hasPermission('RECIPECATEGORIES_ALTER'), categoriesController.create);
categoriesRouter.put('/:id',
celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    name: Joi.string().required(),
    levelId: Joi.string().required(),
    active: Joi.number().required(),
  }
}), ensureAuthenticated, hasPermission('RECIPECATEGORIES_ALTER'), categoriesController.update);
categoriesRouter.delete('/:id', ensureAuthenticated, hasPermission('RECIPECATEGORIES_DELETE'), categoriesController.delete);

export default categoriesRouter;
