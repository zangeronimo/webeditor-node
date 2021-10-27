import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import RolesController from '@api/controllers/webeditor/RolesController';


const rolesController = new RolesController();

const rolesRouter = Router();
rolesRouter.get('/', ensureAuthenticated, hasPermission('ADMINROLE_VIEW'), rolesController.getAll);
rolesRouter.get('/:id', ensureAuthenticated, hasPermission('ADMINROLE_VIEW'), rolesController.getById);
rolesRouter.post('/', ensureAuthenticated, hasPermission('ADMINROLE_ALTER'), rolesController.create);
rolesRouter.put('/:id', ensureAuthenticated, hasPermission('ADMINROLE_ALTER'), rolesController.update);
rolesRouter.delete('/:id', ensureAuthenticated, hasPermission('ADMINROLE_DELETE'), rolesController.delete);

export default rolesRouter;
