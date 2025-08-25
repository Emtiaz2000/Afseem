import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { ShopRoutes } from '../modules/shop/shop.routes';
import { ProductRoutes } from '../modules/product/product.routes';
import { OrderRoutes } from '../modules/order/order.routes';

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
  {
    path: '/order',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
