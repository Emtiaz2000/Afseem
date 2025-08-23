import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { ShopRoutes } from '../modules/shop/shop.routes';
import { ProductRoutes } from '../modules/product/product.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/shop',
    route: ShopRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
