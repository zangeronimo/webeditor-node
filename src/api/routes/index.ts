import { Router } from 'express';
import pagesRouter from './institutional/pages.routes';
import companiesRouter from './webeditor/companies.routes';
import modulesRouter from './webeditor/modules.routes';
import rolesRouter from './webeditor/roles.routes';
import sessionsRouter from './webeditor/sessions.routes';
import usersRouter from './webeditor/users.routes';

const routes = Router();
routes.use('/pages', pagesRouter);

routes.use('/users', usersRouter);
routes.use('/companies', companiesRouter);
routes.use('/modules', modulesRouter);
routes.use('/roles', rolesRouter);
routes.use('/session', sessionsRouter);

export default routes;
