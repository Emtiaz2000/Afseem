import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body;
  // console.log('Product Data:', ProductData);
  const result = await ProductServices.createProductIntoDB(productData);
  sendResponse(res, {
    success: true,
    message: 'Product created successfully!',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
};
