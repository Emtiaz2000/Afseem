import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { ProductValidation } from './product.validation';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post(
  '/create-product',
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductControllers.createProduct,
);

export const ProductRoutes = router;
