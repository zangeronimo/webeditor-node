import { Router } from 'express';
import pagesRouter from './institutional/pages.routes';
import categoriesRouter from './recipe/categories.routes';
import imagesRouter from './recipe/images.routes';
import levelsRouter from './recipe/levels.routes';
import ratingsRouter from './recipe/ratings.routes';
import recipesRouter from './recipe/recipes.routes';
import companiesRouter from './webeditor/companies.routes';
import modulesRouter from './webeditor/modules.routes';
import rolesRouter from './webeditor/roles.routes';
import sessionsRouter from './webeditor/sessions.routes';
import usersRouter from './webeditor/users.routes';

const routes = Router();
routes.use('/recipe/levels', levelsRouter);
routes.use('/recipe/categories', categoriesRouter);
routes.use('/recipe/recipes', recipesRouter);
routes.use('/recipe/images', imagesRouter);
routes.use('/recipe/ratings', ratingsRouter);

routes.use('/institutional/pages', pagesRouter);

routes.use('/users', usersRouter);
routes.use('/companies', companiesRouter);
routes.use('/modules', modulesRouter);
routes.use('/roles', rolesRouter);
routes.use('/session', sessionsRouter);

export default routes;
