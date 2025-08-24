import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { IProduct } from './product.interface';
import { Shop } from '../shop/shop.model';
import { Product } from './product.model';

const createProductIntoDB = async (payload: IProduct) => {
  if (!(await Shop.exists({ _id: payload.shop_id }))) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Shop ID does not exist.');
  }
  const result = await Product.create(payload);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
};
