import { Router } from 'express';
import sessionsRouter from './webeditor/sessions.routes';
import usersRouter from './webeditor/users.routes';

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;