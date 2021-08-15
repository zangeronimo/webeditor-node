import { Router } from 'express';
import companiesRouter from './webeditor/companies.routes';
import sessionsRouter from './webeditor/sessions.routes';
import usersRouter from './webeditor/users.routes';

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/companies', companiesRouter);
routes.use('/session', sessionsRouter);

export default routes;
