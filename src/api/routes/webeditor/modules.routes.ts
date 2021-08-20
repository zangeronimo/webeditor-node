import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import ModulesController from '@api/controllers/webeditor/ModulesController';


const modulesController = new ModulesController();

const modulesRouter = Router();
modulesRouter.get('/', ensureAuthenticated, hasPermission('WEBEDITORMODULE_VIEW'), modulesController.getAll);
modulesRouter.post('/', ensureAuthenticated, hasPermission('WEBEDITORMODULE_ALTER'), modulesController.create);
modulesRouter.put('/:id', ensureAuthenticated, hasPermission('WEBEDITORMODULE_ALTER'), modulesController.update);
modulesRouter.delete('/:id', ensureAuthenticated, hasPermission('WEBEDITORMODULE_DELETE'), modulesController.delete);

export default modulesRouter;
