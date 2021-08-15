import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import CompaniesController from '@api/controllers/webeditor/CompaniesController';


const companiesController = new CompaniesController();

const companiesRouter = Router();
companiesRouter.get('/', ensureAuthenticated, hasPermission('WEBEDITORCOMPANY_VIEW'), companiesController.getAll);
companiesRouter.post('/', ensureAuthenticated, hasPermission('WEBEDITORCOMPANY_ALTER'), companiesController.create);
companiesRouter.put('/:id', ensureAuthenticated, hasPermission('WEBEDITORCOMPANY_ALTER'), companiesController.update);
companiesRouter.delete('/:id', ensureAuthenticated, hasPermission('WEBEDITORCOMPANY_DELETE'), companiesController.delete);

export default companiesRouter;
