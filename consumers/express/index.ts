require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
import ProductRoutes from './src/routes/ProductRoutes';
import ProductController from './src/controllers/ProductController';
import { ProductService } from './src/services/ProductService';
import {
  FirstStepUsecase,
  FourthStepUsecase,
  SecondStepUsecase,
  ThirdStepUsecase,
} from 'application';
const { PLATAFORM_USERNAME, PLATAFORM_PASSWORD, PLATAFORM_URL } = process.env;

app.use(cors());
app.use(express.json());

const productService = new ProductService(
  String(PLATAFORM_URL),
  String(PLATAFORM_USERNAME),
  String(PLATAFORM_PASSWORD)
);

const productController = new ProductController(
  new FirstStepUsecase.Usecase(productService),
  new SecondStepUsecase.Usecase(productService),
  new ThirdStepUsecase.Usecase(productService),
  new FourthStepUsecase.Usecase(productService)
);

app.use(
  '/api',
  new ProductRoutes(express.Router(), productController).getRoutes()
);

app.listen(port, async () => {
  await productService.openBrowser();
  await productService.accessWebsiteInANewTabAndLogin();
  console.log(`App listening on port ${port}`);
});
