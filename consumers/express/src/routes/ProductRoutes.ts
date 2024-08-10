import IProductController from '../controllers/interfaces/IProductController';
import { Router } from 'express';
import IRouter from './interfaces/IRouter';

export default class ProductRoutes implements IRouter {
  constructor(public router: Router, private controller: IProductController) {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/register',
      async (req, res) => await this.controller.register(req, res)
    );
  }

  getRoutes() {
    return this.router;
  }
}
