import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    shop_id: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    product_name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model<IProduct>('Product', productSchema);
