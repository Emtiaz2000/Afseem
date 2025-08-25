import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await OrderServices.createOrder(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data: order,
  });
});

const getOrdersByBuyer = catchAsync(async (req: Request, res: Response) => {
  const { buyerId } = req.params;
  const orders = await OrderServices.getOrdersByBuyer(buyerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully for buyer',
    data: orders,
  });
});

const getOrdersByShop = catchAsync(async (req: Request, res: Response) => {
  const { shopId } = req.params;
  const orders = await OrderServices.getOrdersByShop(shopId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully for shop',
    data: orders,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const order = await OrderServices.updateOrderStatus(orderId, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order status updated successfully',
    data: order,
  });
});

export const OrderControllers = {
  createOrder,
  getOrdersByBuyer,
  getOrdersByShop,
  updateOrderStatus,
};
