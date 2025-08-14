import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { ShopServices } from './shop.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createShop = catchAsync(async (req: Request, res: Response) => {
  const shopData = req.body;
  // console.log('Shop Data:', shopData);

  const result = await ShopServices.createShopIntoDB(shopData);
  sendResponse(res, {
    success: true,
    message: 'Shop created successfully!',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

export const ShopControllers = {
  createShop,
};
