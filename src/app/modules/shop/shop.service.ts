import AppError from '../../errors/AppError';
import { IShop } from './shop.interface';
import httpStatus from 'http-status';
import { Shop } from './shop.model';
import { User } from '../user/user.model';

const createShopIntoDB = async (payload: IShop) => {
  if (await Shop.isNameExist(payload.shop_name)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This shop name is already taken. Please choose another one.',
    );
  }
  if (!(await User.findById(payload.owner_id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'User ID does not exist.');
  }
  const result = await Shop.create(payload);
  return result;
};

export const ShopServices = {
  createShopIntoDB,
};
