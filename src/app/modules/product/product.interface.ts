import { Types } from 'mongoose';

export interface IProduct {
  _id?: Types.ObjectId;
  shop_id: Types.ObjectId;

  photo: string;
  product_name: string;
  description?: string;
  category: string;
  sub_category?: string;

  price: number;
  discount_price?: number;
  quantity: number;

  // meta info
  createdBy: Types.ObjectId; // User (seller/admin)
  createdAt?: Date;
  updatedAt?: Date;
}
