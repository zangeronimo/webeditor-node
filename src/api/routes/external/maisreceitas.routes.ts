import { Router } from 'express';
import * as dotenv from 'dotenv';

import MaisReceitasController from '@api/controllers/external/MaisReceitasController';
import ensureHavePermission from '@infra/middlewares/ensureHavePermission';

dotenv.config();
const maisreceitasController = new MaisReceitasController();
const host = process.env.MAISRECEITAS;
const open = false;

const maisreceitasRouter = Router();
maisreceitasRouter.get('/page/:id', ensureHavePermission(host, open), maisreceitasController.getPageById);
maisreceitasRouter.get('/levels', ensureHavePermission(host, open), maisreceitasController.getLevels);
maisreceitasRouter.get('/categories', ensureHavePermission(host, open), maisreceitasController.getCategories);
maisreceitasRouter.get('/categories/:level/:slug', ensureHavePermission(host, open), maisreceitasController.getCategoryBySlug);
maisreceitasRouter.get('/recipes', ensureHavePermission(host, open), maisreceitasController.getRecipes);
maisreceitasRouter.get('/recipes/img', ensureHavePermission(host, open), maisreceitasController.getImgRecipes);
maisreceitasRouter.get('/recipes/img/:category', ensureHavePermission(host, open), maisreceitasController.getImgRecipesByCategory);
maisreceitasRouter.get('/recipes/:slug', ensureHavePermission(host, open), maisreceitasController.getRecipeBySlug);
maisreceitasRouter.get('/recipes/category/:category', ensureHavePermission(host, open), maisreceitasController.getRecipesByCategory);

export default maisreceitasRouter;
