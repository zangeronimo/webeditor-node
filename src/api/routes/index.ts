import { Router } from 'express';

import pagesRouter from './institutional/pages.routes';
import mktCategoriesRouter from './mkt/categories.routes';
import mktProductsRouter from './mkt/products.routes';
import categoriesRouter from './recipe/categories.routes';
import imagesRouter from './recipe/images.routes';
import levelsRouter from './recipe/levels.routes';
import ratingsRouter from './recipe/ratings.routes';
import recipesRouter from './recipe/recipes.routes';
import companiesRouter from './webeditor/companies.routes';
import modulesRouter from './webeditor/modules.routes';
import rolesRouter from './webeditor/roles.routes';
import { SessionRoutes } from './webeditor/sessions.routes';
import { UserRoutes } from './webeditor/users.routes';

//EXTERNAL IMPORTS
import maisreceitasRouter from './external/maisreceitas.routes';
import IHashProvider from '@infra/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@domain/interfaces/webeditor/IUsersRepository';
import { IShowUsersService } from '@domain/interfaces/services/webeditor/IShowUsersService';

export class Routes {
    constructor(
        readonly hashProvider: IHashProvider, 
        readonly userRepository: IUsersRepository, 
        ) { }

    Create() {
        const routes = Router();
        routes.use('/recipe/levels', levelsRouter);
        routes.use('/recipe/categories', categoriesRouter);
        routes.use('/recipe/recipes', recipesRouter);
        routes.use('/recipe/images', imagesRouter);
        routes.use('/recipe/ratings', ratingsRouter);
        
        routes.use('/marketing/categories', mktCategoriesRouter);
        routes.use('/marketing/products', mktProductsRouter);
        
        routes.use('/institutional/pages', pagesRouter);
        
        routes.use('/users', UserRoutes.Create(this.userRepository, this.hashProvider));
        routes.use('/companies', companiesRouter);
        routes.use('/modules', modulesRouter);
        routes.use('/roles', rolesRouter);
        routes.use('/session', SessionRoutes.Create(this.hashProvider, this.userRepository));
        
        // EXTERNAL ROUTES
        routes.use('/maisreceitas', maisreceitasRouter)
        
        return routes;
    }
}


