import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import hasSomePermission from '@infra/middlewares/hasSomePermission';
import ModulesController from '@api/controllers/webeditor/ModulesController';


const modulesController = new ModulesController();

const modulesRouter = Router();
modulesRouter.get('/', ensureAuthenticated, hasSomePermission(['ADMINMODULE_VIEW', 'WEBEDITORUSER_ALTER']), modulesController.getAll);
modulesRouter.post('/', ensureAuthenticated, hasPermission('ADMINMODULE_ALTER'), modulesController.create);
modulesRouter.put('/:id', ensureAuthenticated, hasPermission('ADMINMODULE_ALTER'), modulesController.update);
modulesRouter.delete('/:id', ensureAuthenticated, hasPermission('ADMINMODULE_DELETE'), modulesController.delete);

export default modulesRouter;
