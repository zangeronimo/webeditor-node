import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import RolesController from '@api/controllers/webeditor/RolesController';


const rolesController = new RolesController();

const rolesRouter = Router();
rolesRouter.get('/', ensureAuthenticated, hasPermission('WEBEDITORROLE_VIEW'), rolesController.getAll);
rolesRouter.post('/', ensureAuthenticated, hasPermission('WEBEDITORROLE_ALTER'), rolesController.create);
rolesRouter.put('/:id', ensureAuthenticated, hasPermission('WEBEDITORROLE_ALTER'), rolesController.update);
rolesRouter.delete('/:id', ensureAuthenticated, hasPermission('WEBEDITORROLE_DELETE'), rolesController.delete);

export default rolesRouter;
