import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { ShopValidation } from './shop.validation';
import { ShopControllers } from './shop.controller';

const router = express.Router();

router.post(
  '/create-shop',
  validateRequest(ShopValidation.createShopValidationSchema),
  ShopControllers.createShop,
);

export const ShopRoutes = router;
