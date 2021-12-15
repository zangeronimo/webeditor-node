import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import { celebrate, Joi, Segments } from 'celebrate';
import ProductsController from '@api/controllers/mkt/ProductsController';

const productsController = new ProductsController();

const productsRouter = Router();
productsRouter.get('/', ensureAuthenticated, hasPermission('MKTPRODUCTS_VIEW'), productsController.getAll);
productsRouter.get('/:id', ensureAuthenticated, hasPermission('MKTPRODUCTS_VIEW'), productsController.getById);
productsRouter.post('/',
celebrate({
  [Segments.BODY]: {
    file: Joi.string(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    url: Joi.string().required(),
    categoryId: Joi.string().required(),
    active: Joi.number().required(),
  }
}), ensureAuthenticated, hasPermission('MKTPRODUCTS_ALTER'), productsController.create);
productsRouter.put('/:id',
celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    file: Joi.string(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    url: Joi.string().required(),
    categoryId: Joi.string().required(),
    active: Joi.number().required(),
  }
}), ensureAuthenticated, hasPermission('MKTPRODUCTS_ALTER'), productsController.update);
productsRouter.delete('/:id', ensureAuthenticated, hasPermission('MKTPRODUCTS_DELETE'), productsController.delete);

export default productsRouter;
