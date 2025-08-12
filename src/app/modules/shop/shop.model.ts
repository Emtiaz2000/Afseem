import { Schema, model } from 'mongoose';
import { IShop, ShopModel } from './shop.interface';

const ShopSchema = new Schema<IShop, ShopModel>(
  {
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // each shop has a unique owner
    },
    shop_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    logo_url: {
      type: String,
      trim: true,
      default: null
    },
    banner_url: {
      type: String,
      trim: true,
    },
    business_type: {
      type: String,
      trim: true,
    },
    shop_address: {
      locationMap: { type: String, trim: true },
      street: { type: String, required: true },
      zip: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      required: true,
    },
    working_hours: {
      open: { type: String },
      close: { type: String },
    },
    delivery_available: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  },
);

ShopSchema.statics.isNameExist = async function (
  name: string,
): Promise<IShop | null> {
  return this.findOne({ shop_name: name });
};

export const Shop = model<IShop, ShopModel>('Shop', ShopSchema);
