import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import { celebrate, Joi, Segments } from 'celebrate';
import CategoriesController from '@api/controllers/mkt/CategoriesController';

const categoriesController = new CategoriesController();

const categoriesRouter = Router();
categoriesRouter.get('/', ensureAuthenticated, hasPermission('MKTCATEGORIES_VIEW'), categoriesController.getAll);
categoriesRouter.get('/:id', ensureAuthenticated, hasPermission('MKTCATEGORIES_VIEW'), categoriesController.getById);
categoriesRouter.post('/',
celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  }
}), ensureAuthenticated, hasPermission('MKTCATEGORIES_ALTER'), categoriesController.create);
categoriesRouter.put('/:id',
celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    name: Joi.string().required(),
    active: Joi.number().required(),
  }
}), ensureAuthenticated, hasPermission('MKTCATEGORIES_ALTER'), categoriesController.update);
categoriesRouter.delete('/:id', ensureAuthenticated, hasPermission('MKTCATEGORIES_DELETE'), categoriesController.delete);

export default categoriesRouter;
