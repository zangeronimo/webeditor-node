import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import hasSomePermission from '@infra/middlewares/hasSomePermission';
import ModulesController from '@api/controllers/webeditor/ModulesController';


const modulesController = new ModulesController();

const modulesRouter = Router();
modulesRouter.get('/', ensureAuthenticated, hasPermission('ADMINMODULE_VIEW'), modulesController.getAll);
modulesRouter.get('/user', ensureAuthenticated, hasPermission('WEBEDITORUSER_ALTER'), modulesController.getAllByUser);
modulesRouter.post('/', ensureAuthenticated, hasPermission('ADMINMODULE_ALTER'), modulesController.create);
modulesRouter.put('/:id', ensureAuthenticated, hasPermission('ADMINMODULE_ALTER'), modulesController.update);
modulesRouter.delete('/:id', ensureAuthenticated, hasPermission('ADMINMODULE_DELETE'), modulesController.delete);

export default modulesRouter;
