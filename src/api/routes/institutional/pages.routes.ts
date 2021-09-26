import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import PagesController from '@api/controllers/institutional/PagesController';


const pagesController = new PagesController();

const pagesRouter = Router();
pagesRouter.get('/', ensureAuthenticated, hasPermission('INSTITUTIONALPAGES_VIEW'), pagesController.getAll);
pagesRouter.post('/', ensureAuthenticated, hasPermission('INSTITUTIONALPAGES_ALTER'), pagesController.create);
pagesRouter.put('/:id', ensureAuthenticated, hasPermission('INSTITUTIONALPAGES_ALTER'), pagesController.update);
pagesRouter.delete('/:id', ensureAuthenticated, hasPermission('INSTITUTIONALPAGES_DELETE'), pagesController.delete);

export default pagesRouter;
