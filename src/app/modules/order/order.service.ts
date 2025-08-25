import { IOrder, IOrderItem } from './order.interface';
import { Order } from './order.model';
import { Product } from '../product/product.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createOrder = async (payload: Partial<IOrder>) => {
  const { buyer_id, shop_id, items, delivery_address, whatsapp_no } = payload;
  if (!items || items.length === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'At least one product is required',
    );
  }

  let totalAmount = 0;
  const orderItems: IOrderItem[] = [];

  for (const item of items) {
    const product = await Product.findById(item.product_id);

    if (!product) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Product not found: ${item.product_id}`,
      );
    }

    if (product.quantity < item.quantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Insufficient stock for product: ${product.product_name}`,
      );
    }

    // Deduct stock
    product.quantity -= item.quantity;
    await product.save();

    const itemTotal = product.price * item.quantity;
    totalAmount += itemTotal;

    orderItems.push({
      product_id: product._id,
      product_name: product.product_name,
      quantity: item.quantity,
      price: product.price,
    });
  }

  const orderData: IOrder = {
    buyer_id: buyer_id!,
    shop_id: shop_id!,
    items: orderItems,
    total_amount: totalAmount,
    status: 'pending',
    payment_status: 'unpaid',
    delivery_address: delivery_address!,
    whatsapp_no: whatsapp_no!,
  };

  const order = await Order.create(orderData);
  return order;
};

const getOrdersByBuyer = async (buyerId: string) => {
  return await Order.find({ buyer_id: buyerId }).populate(
    'items.product_id',
    'product_name price photo',
  );
};

const getOrdersByShop = async (shopId: string) => {
  return await Order.find({ shop_id: shopId }).populate(
    'items.product_id',
    'product_name price photo',
  );
};

const updateOrderStatus = async (orderId: string, status: string) => {
  return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};

export const OrderServices = {
  createOrder,
  getOrdersByBuyer,
  getOrdersByShop,
  updateOrderStatus,
};
