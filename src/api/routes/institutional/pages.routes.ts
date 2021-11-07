import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import PagesController from '@api/controllers/institutional/PagesController';
import { celebrate, Joi, Segments } from 'celebrate';


const pagesController = new PagesController();

const pagesRouter = Router();
pagesRouter.get('/', ensureAuthenticated, hasPermission('INSTITUTIONALPAGES_VIEW'), pagesController.getAll);
pagesRouter.get('/:id', ensureAuthenticated, hasPermission('INSTITUTIONALPAGES_VIEW'), pagesController.getById);
pagesRouter.post('/',
celebrate({
  [Segments.BODY]: {
    title: Joi.string().required(),
    file: Joi.string(),
    content: Joi.string().required(),
  }
}), ensureAuthenticated, hasPermission('INSTITUTIONALPAGES_ALTER'), pagesController.create);
pagesRouter.put('/:id',
celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    file: Joi.string(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    active: Joi.number().required(),
  }
}), ensureAuthenticated, hasPermission('INSTITUTIONALPAGES_ALTER'), pagesController.update);
pagesRouter.delete('/:id', ensureAuthenticated, hasPermission('INSTITUTIONALPAGES_DELETE'), pagesController.delete);

export default pagesRouter;
