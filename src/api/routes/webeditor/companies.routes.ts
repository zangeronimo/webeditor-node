import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import hasPermission from '@infra/middlewares/hasPermission';
import CompaniesController from '@api/controllers/webeditor/CompaniesController';


const companiesController = new CompaniesController();

const companiesRouter = Router();
companiesRouter.get('/', ensureAuthenticated, hasPermission('ADMINCOMPANY_VIEW'), companiesController.getAll);
companiesRouter.post('/', ensureAuthenticated, hasPermission('ADMINCOMPANY_ALTER'), companiesController.create);
companiesRouter.put('/:id', ensureAuthenticated, hasPermission('ADMINCOMPANY_ALTER'), companiesController.update);
companiesRouter.delete('/:id', ensureAuthenticated, hasPermission('ADMINCOMPANY_DELETE'), companiesController.delete);

export default companiesRouter;
