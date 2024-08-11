import IProductController from '../controllers/interfaces/IProductController';
import { Router } from 'express';
import IRouter from './interfaces/IRouter';

export default class ProductRoutes implements IRouter {
  constructor(public router: Router, private controller: IProductController) {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/first-step',
      async (req, res) => await this.controller.firstStep(req, res)
    );
    this.router.post(
      '/second-step',
      async (req, res) => await this.controller.secondStep(req, res)
    );
    this.router.post(
      '/third-step',
      async (req, res) => await this.controller.thirdStep(req, res)
    );
    this.router.post(
      '/fourth-step',
      async (req, res) => await this.controller.fourthStep(req, res)
    );
  }

  getRoutes() {
    return this.router;
  }
}
