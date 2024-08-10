require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
import puppeteer from 'puppeteer';
import ProductRoutes from './src/routes/ProductRoutes';
import ProductController from './src/controllers/ProductController';

app.use(cors());
app.use(express.json());
app.use(
  '/product',
  new ProductRoutes(
    express.Router(),
    new ProductController(puppeteer)
  ).getRoutes()
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
