import { Schema, model } from 'mongoose';
import { IOrder, IOrderItem } from './order.interface';

const orderItemSchema = new Schema<IOrderItem>({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  product_name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number },
});

const orderSchema = new Schema<IOrder>(
  {
    buyer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    shop_id: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
    items: { type: [orderItemSchema], required: true },
    total_amount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    payment_status: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid',
    },
    delivery_address: {
      locationMap: { type: String },
      address: { type: String, required: true },
      street: { type: String, required: true },
      zip: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    whatsapp_no: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Order = model<IOrder>('Order', orderSchema);
