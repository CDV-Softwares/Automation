import { Router } from 'express';

export default interface IRouter {
  router: Router;
  getRoutes(): Router;
  initializeRoutes(): void;
}
