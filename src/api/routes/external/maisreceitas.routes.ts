import { Router } from 'express';
import * as dotenv from 'dotenv';

import MaisReceitasController from '@api/controllers/external/MaisReceitasController';
import ensureHavePermission from '@infra/middlewares/ensureHavePermission';

dotenv.config();
const maisreceitasController = new MaisReceitasController();
const host = process.env.MAISRECEITAS;
const open = true;

const maisreceitasRouter = Router();
maisreceitasRouter.get('/page/:id', ensureHavePermission(host, open), maisreceitasController.getPageById);
maisreceitasRouter.get('/levels', ensureHavePermission(host, open), maisreceitasController.getLevels);
maisreceitasRouter.get('/categories', ensureHavePermission(host, open), maisreceitasController.getCategories);
maisreceitasRouter.get('/recipes', ensureHavePermission(host, open), maisreceitasController.getRecipes);
maisreceitasRouter.get('/recipes/img', ensureHavePermission(host, open), maisreceitasController.getImgRecipes);
maisreceitasRouter.get('/recipes/:slug', ensureHavePermission(host, open), maisreceitasController.getRecipeBySlug);

export default maisreceitasRouter;
